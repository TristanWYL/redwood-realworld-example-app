import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  ArticleResolvers,
} from 'types/graphql'
import slugify from 'slugify'
import { EmailValidationError } from '@redwoodjs/api'

export const articles: QueryResolvers['articles'] = () => {
  return db.article.findMany()
}

export const article: QueryResolvers['article'] = ({ id }) => {
  return db.article.findUnique({
    where: { id },
  })
}

export const queryArticleBySlug = ({ slug }) => {
  return db.article
    .findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            bio: true,
            image: true,
            followedBy: true,
          },
        },
        favoritedBy: true,
        _count: {
          select: {
            favoritedBy: true,
          },
        },
      },
    })
    .then((result) => {
      if (result) {
        result.favoriteCount = result._count.favoritedBy
        result.favoritedByMe = context.currentUser?.username
          ? result.favoritedBy.some(
              (item) => item.username === context.currentUser.username
            )
          : false
        result.author.followedByMe = context.currentUser?.username
          ? result.author.followedBy.some(
              (item) => item.username === context.currentUser.username
            )
          : false
      }
      // console.log(result)
      return result
    })
}

const PAGE_SIZE = 5
/**
 * @param page
 *    starts from 1
 * @param username
 *    whose posts shall be queried.
 *    When used with favorited equal to 'true', username means of whom
 *    the favorite posts should be returned.
 *    When used with feed equal to 'true', username means this query should
 *    return those articles of which the author is followed by 'username'
 */
export const articleList = async ({
  feed,
  tag,
  username,
  favorited,
  page = 1,
}) => {
  const option = { orderBy: { id: 'desc' }, where: {} }
  if (tag) {
    option.where.tagList = { some: { name: tag } }
  }
  if (favorited || feed) {
    if (favorited) {
      if (!username) throw new Error("Argument 'username' is missed!")
      if (feed) throw new Error("Argument 'feed' collides with 'favorited'!")
      option.where.favoritedBy = { some: { username } }
    }
    if (feed) {
      if (!username) throw new Error("Argument 'username' is missed!")
      if (favorited)
        throw new Error("Argument 'feed' collides with 'favorited'!")
      option.where.author = { followedBy: { some: { username } } }
    }
  } else if (username) {
    option.where.author = { username: username }
  }
  const count = await db.article.count({
    where: option.where,
  })
  // refer: https://www.prisma.io/docs/concepts/components/prisma-client/aggregation-grouping-summarizing#count-relations
  option.include = {
    _count: {
      select: { favoritedBy: true },
    },
    favoritedBy: {
      select: { username: true },
    },
  }

  // for retrieving the count within one query here, we have to do the query this way
  // refer to: https://github.com/prisma/prisma/discussions/3087#discussioncomment-2619461
  // take: PAGE_SIZE
  // skip: 0,
  // if (page) {
  //   option.skip = (page - 1) * PAGE_SIZE
  // }
  // do pagination here
  option.take = PAGE_SIZE
  option.skip = (page - 1) * PAGE_SIZE
  const articles = await db.article.findMany(option)
  articles.forEach((a) => {
    a.favoriteCount = a._count.favoritedBy
  })
  if (context.currentUser?.username) {
    articles.forEach((a) => {
      a.favoritedByMe = a.favoritedBy?.some(
        (item) => item.username === context.currentUser.username
      )
    })
  }
  // console.log(articles)
  return {
    articles,
    count,
  }
}

export const createArticle: MutationResolvers['createArticle'] = ({
  input,
}) => {
  input.slug = `${slugify(input.title)}-${input.authorId}`
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

export const updateArticle: MutationResolvers['updateArticle'] = async ({
  id,
  input,
}) => {
  const newSlug = `${slugify(input.title)}-${input.authorId}`
  const existingTitle = await db.article.findFirst({
    where: {
      slug: newSlug,
      NOT: {
        id: {
          equals: id,
        },
      },
    },
  })
  if (existingTitle) {
    throw new EmailValidationError('title', 'Title must be unique.')
  }

  // disconnectArticlesTags
  await db.article.update({
    where: { id },
    data: { tagList: { set: [] } },
  })

  input.tagList = {
    connectOrCreate: input.tagList.map((tag: string) => ({
      create: { name: tag },
      where: { name: tag },
    })),
  }
  return db.article.update({
    where: { id },
    data: input,
  })
}

export const deleteArticle: MutationResolvers['deleteArticle'] = ({ id }) => {
  // can only delete the user's own article
  // so check the identity first
  // TODO: check the identity before deleting
  return db.article.delete({
    where: { id },
  })
}

export const changeFavorite = async ({ username, slug, favorite }) => {
  const optionFavoritedBy = favorite
    ? { connect: { username } }
    : { disconnect: { username } }
  const { _count, ...article } = await db.article.update({
    where: { slug },
    data: {
      favoritedBy: optionFavoritedBy,
    },
    include: {
      tagList: {
        select: {
          name: true,
        },
      },
      author: {
        select: {
          username: true,
          bio: true,
          image: true,
          followedBy: true,
        },
      },
      favoritedBy: true,
      _count: {
        select: {
          favoritedBy: true,
        },
      },
    },
  })
  return {
    ...article,
    favoriteCount: _count?.favoritedBy,
    favoritedByMe: article.favoritedBy.some(
      (favorited) => favorited.username === username
    ),
  }
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
