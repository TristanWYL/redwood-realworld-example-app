import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  ArticleResolvers,
} from 'types/graphql'

export const articles: QueryResolvers['articles'] = () => {
  return db.article.findMany()
}

export const article: QueryResolvers['article'] = ({ id }) => {
  return db.article.findUnique({
    where: { id },
  })
}

// TODO: handle feed/favorited with authentication
export const advancedQueryArticles = ({ feed, tag, username, favorited }) => {
  const condition = { take: 10, where: {} }
  if (tag) {
    condition.where.tagList = { some: { name: tag } }
  }
  if (username) {
    condition.where.author = { username: username }
  }
  console.log(condition)
  return db.article.findMany(condition)
}

export const createArticle: MutationResolvers['createArticle'] = ({
  input,
}) => {
  input.tagList = {
    connectOrCreate: input.tagList.map((tag: string) => ({
      create: { name: tag },
      where: { name: tag },
    })),
  }
  return db.article.create({
    data: input,
  })
}

export const updateArticle: MutationResolvers['updateArticle'] = ({
  id,
  input,
}) => {
  return db.article.update({
    data: input,
    where: { id },
  })
}

export const deleteArticle: MutationResolvers['deleteArticle'] = ({ id }) => {
  return db.article.delete({
    where: { id },
  })
}

export const Article: ArticleResolvers = {
  tagList: (_obj, { root }) =>
    db.article.findUnique({ where: { id: root.id } }).tagList(),
  author: (_obj, { root }) =>
    db.article.findUnique({ where: { id: root.id } }).author(),
  favoritedBy: (_obj, { root }) =>
    db.article.findUnique({ where: { id: root.id } }).favoritedBy(),
  comments: (_obj, { root }) =>
    db.article.findUnique({ where: { id: root.id } }).comments(),
}
