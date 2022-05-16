import { db } from 'src/lib/db'
import { validate } from '@redwoodjs/api'
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

export const createUser: MutationResolvers['createUser'] = ({ input }) => {
  validate(input.email, 'email', { email: true })
  return db.user.create({
    data: input,
  })
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