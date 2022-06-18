import { db } from 'src/lib/db'
import {
  EmailValidationError,
  validate,
  validateUniqueness,
} from '@redwoodjs/api'
import type {
  QueryResolvers,
  MutationResolvers,
  UserResolvers,
} from 'types/graphql'
import crypto from 'crypto-js'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const userRelation = ({ username }) => {
  return db.user
    .findUnique({
      where: { username },
      include: {
        followedBy: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    })
    .then((user) => {
      if (user) {
        user.followedByMe = context.currentUser?.username
          ? user.followedBy.some(
              (item) => item.username === context.currentUser.username
            )
          : false
      }
      return user
    })
}

export const userInfoWithoutPrivacy = ({ username }) => {
  return db.user.findUnique({
    where: { username },
  })
}

/**
 * This function is not used, as the creation of users is done in
 * api\src\functions\auth.ts
 */
export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  validate(input.email, 'email', { email: true })
  return validateUniqueness(
    'user',
    { email: input.email },
    { message: 'Your email is already in use' },
    (db) =>
      validateUniqueness(
        'user',
        { username: input.username },
        { message: 'Your username is already in use' },
        (db) =>
          db.user.create({
            data: input,
          })
      )
  )
}

export const updateUser: MutationResolvers['updateUser'] = async ({
  input,
}) => {
  validate(input.email, 'email', { email: true })
  // check uniqueness of username and email
  if (input.username !== context.currentUser.username) {
    const user = await db.user.findUnique({
      where: { username: input.username },
    })
    if (user) {
      throw new EmailValidationError(
        'username',
        'New username is already in use by others.'
      )
    }
  }
  if (input.email !== context.currentUser.email) {
    const user = await db.user.findUnique({
      where: { email: input.email },
    })
    if (user) {
      throw new EmailValidationError(
        'email',
        'New email is already in use by others.'
      )
    }
  }

  if (input.password === '') {
    delete input.password
  } else {
    input.password = crypto
      .PBKDF2(input.password, 'c7febe9729c37c77595a842b7bbb31f7', {
        keySize: 256 / 32,
      })
      .toString()
  }
  return db.user.update({
    data: input,
    where: { id: context.currentUser.id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const changeFollow = ({ username, follow }) => {
  const optionFollowedBy = follow
    ? { connect: { username: context.currentUser.username } }
    : { disconnect: { username: context.currentUser.username } }
  return db.user
    .update({
      where: { username },
      data: { followedBy: optionFollowedBy },
      include: { followedBy: { select: { username: true } } },
    })
    .then((user) => {
      user.followedByMe = context.currentUser.username
        ? user.followedBy.some(
            (item) => item.username === context.currentUser.username
          )
        : false
      return user
    })
}

export const User: UserResolvers = {
  articles: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).articles(),
  favorites: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).favorites(),
  followedBy: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).followedBy(),
  following: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).following(),
  comments: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).comments(),
}
