import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  CommentResolvers,
} from 'types/graphql'

export const comments: QueryResolvers['comments'] = () => {
  return db.comment.findMany()
}

export const getCommentsByArticleId = ({
  articleId,
}: {
  articleId: number
}) => {
  return db.comment.findMany({
    where: { articleId },
    orderBy: { id: 'desc' },
  })
}

export const comment: QueryResolvers['comment'] = ({ id }) => {
  return db.comment.findUnique({
    where: { id },
  })
}

export const createComment: MutationResolvers['createComment'] = ({
  input,
}) => {
  input.authorId = context.currentUser.id
  return db.comment.create({
    data: input,
  })
}

export const updateComment: MutationResolvers['updateComment'] = ({
  id,
  input,
}) => {
  return db.comment.update({
    data: input,
    where: { id },
  })
}

export const deleteComment: MutationResolvers['deleteComment'] = ({ id }) => {
  return db.comment.delete({
    where: { id },
  })
}

export const Comment: CommentResolvers = {
  article: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).article(),
  author: (_obj, { root }) =>
    db.comment.findUnique({ where: { id: root.id } }).author(),
}
