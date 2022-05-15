import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    one: {
      data: {
        body: 'String',
        article: {
          create: {
            slug: 'String5690399',
            title: 'String',
            description: 'String',
            body: 'String',
            author: {
              create: {
                email: 'String1415517',
                username: 'String2388462',
                password: 'String',
              },
            },
          },
        },
        author: {
          create: {
            email: 'String6553421',
            username: 'String5051160',
            password: 'String',
          },
        },
      },
    },
    two: {
      data: {
        body: 'String',
        article: {
          create: {
            slug: 'String3227456',
            title: 'String',
            description: 'String',
            body: 'String',
            author: {
              create: {
                email: 'String7270505',
                username: 'String5536467',
                password: 'String',
              },
            },
          },
        },
        author: {
          create: {
            email: 'String6943043',
            username: 'String5495593',
            password: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = typeof standard
