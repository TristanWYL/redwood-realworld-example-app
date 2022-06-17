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

export const queryArticleBySlug = ({ slug, me }) => {
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
        result.favoritedByMe = me
          ? result.favoritedBy.some((item) => item.username === me)
          : false
        result.author.followedByMe = me
          ? result.author.followedBy.some((item) => item.username === me)
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
 * @param me
 *    Will be used to check whether each returned article is favorited by 'me'.
 *    Here 'me' represents the 'username' of User
 */
export const articleList = async ({
  feed,
  tag,
  username,
  favorited,
  page = 1,
  me,
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
  if (me) {
    articles.forEach((a) => {
      a.favoritedByMe = a.favoritedBy?.some((item) => item.username === me)
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
