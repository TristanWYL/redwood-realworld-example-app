import type { Prisma } from '@prisma/client'

export const standard = defineScenario<Prisma.TagCreateArgs>({
  tag: {
    one: { data: { name: 'String5670356' } },
    two: { data: { name: 'String1894524' } },
  },
})

export type StandardScenario = typeof standard
