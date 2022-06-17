import { db } from 'src/lib/db'
import { validate, validateUniqueness } from '@redwoodjs/api'
import type {
  QueryResolvers,
  MutationResolvers,
  UserResolvers,
} from 'types/graphql'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const userRelation = ({ username, me }) => {
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
        user.followedByMe = user.followedBy.some((item) => item.username === me)
      }
      return user
    })
}

export const userInfoWithoutPrivacy = ({ username }) => {
  return db.user.findUnique({
    where: { username },
  })
}

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

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  validate(input.email, 'email', { email: true })
  return db.user.update({
    data: input,
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const changeFollow = ({ username, me, follow }) => {
  const optionFollowedBy = follow
    ? { connect: { username: me } }
    : { disconnect: { username: me } }
  return db.user
    .update({
      where: { username },
      data: { followedBy: optionFollowedBy },
      include: { followedBy: { select: { username: true } } },
    })
    .then((user) => {
      user.followedByMe = me
        ? user.followedBy.some((item) => item.username === me)
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
