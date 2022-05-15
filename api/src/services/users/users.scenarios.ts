import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: {
      data: {
        email: 'String6972010',
        username: 'String3830158',
        password: 'String',
      },
    },
    two: {
      data: {
        email: 'String7107649',
        username: 'String2484129',
        password: 'String',
      },
    },
  },
})

export type StandardScenario = typeof standard
