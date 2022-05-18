import { db } from 'src/lib/db'
import type {
  QueryResolvers,
  MutationResolvers,
  TagResolvers,
} from 'types/graphql'

export const tags: QueryResolvers['tags'] = () => {
  return db.tag.findMany()
}

export const topTags = ({ username }) => {
  const queries = []
  if (username) {
    queries.push({
      username: {
        equals: username,
      },
    })
  }
  console.log(queries)
  return db.tag.findMany({
    // where: {
    //   articles: {
    //     some: {
    //       author: {
    //         OR: queries,
    //       },
    //     },
    //   },
    // },
    // _count: {
    //   name: true,
    // },
    orderBy: {
      articles: {
        _count: 'desc',
      },
    },
    take: 5,
  })
}

export const tag: QueryResolvers['tag'] = ({ id }) => {
  return db.tag.findUnique({
    where: { id },
  })
}

export const createTag: MutationResolvers['createTag'] = ({ input }) => {
  return db.tag.create({
    data: input,
  })
}

export const updateTag: MutationResolvers['updateTag'] = ({ id, input }) => {
  return db.tag.update({
    data: input,
    where: { id },
  })
}

export const deleteTag: MutationResolvers['deleteTag'] = ({ id }) => {
  return db.tag.delete({
    where: { id },
  })
}

export const Tag: TagResolvers = {
  articles: (_obj, { root }) =>
    db.tag.findUnique({ where: { id: root.id } }).articles(),
}
