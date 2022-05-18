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
// @param: page starts from 1
export const articlePage = async ({
  feed,
  tag,
  username,
  favorited,
  page = 1,
}) => {
  const PAGE_SIZE = 5
  const condition = { orderBy: { id: 'desc' }, where: {} }
  if (tag) {
    condition.where.tagList = { some: { name: tag } }
  }
  if (username) {
    condition.where.author = { username: username }
  }
  // for retrieving the count within one query here, we have to do the query this way
  // refer to: https://github.com/prisma/prisma/discussions/3087#discussioncomment-2619461
  // take: PAGE_SIZE
  // skip: 0,
  // if (page) {
  //   condition.skip = (page - 1) * PAGE_SIZE
  // }
  let articles = await db.article.findMany(condition)
  const count = articles.length
  articles = articles.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  return {
    articles,
    count,
  }
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
