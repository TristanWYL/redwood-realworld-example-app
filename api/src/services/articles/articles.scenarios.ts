import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.ArticleCreateArgs>({
  article: {
    one: {
      data: {
        slug: 'String8957166',
        title: 'String',
        description: 'String',
        body: 'String',
        author: {
          create: {
            email: 'String7316962',
            username: 'String4041108',
            password: 'String',
          },
        },
      },
    },
    two: {
      data: {
        slug: 'String3142118',
        title: 'String',
        description: 'String',
        body: 'String',
        author: {
          create: {
            email: 'String4957577',
            username: 'String8606614',
            password: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
