import {
  articles,
  article,
  createArticle,
  updateArticle,
  deleteArticle,
} from './articles'
import type { StandardScenario } from './articles.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('articles', () => {
  scenario('returns all articles', async (scenario: StandardScenario) => {
    const result = await articles()

    expect(result.length).toEqual(Object.keys(scenario.article).length)
  })

  scenario('returns a single article', async (scenario: StandardScenario) => {
    const result = await article({ id: scenario.article.one.id })

    expect(result).toEqual(scenario.article.one)
  })

  scenario('creates a article', async (scenario: StandardScenario) => {
    const result = await createArticle({
      input: {
        slug: 'String8533224',
        title: 'String',
        description: 'String',
        body: 'String',
        authorId: scenario.article.two.authorId,
      },
    })

    expect(result.slug).toEqual('String8533224')
    expect(result.title).toEqual('String')
    expect(result.description).toEqual('String')
    expect(result.body).toEqual('String')
    expect(result.authorId).toEqual(scenario.article.two.authorId)
  })

  scenario('updates a article', async (scenario: StandardScenario) => {
    const original = await article({ id: scenario.article.one.id })
    const result = await updateArticle({
      id: original.id,
      input: { slug: 'String77185112' },
    })

    expect(result.slug).toEqual('String77185112')
  })

  scenario('deletes a article', async (scenario: StandardScenario) => {
    const original = await deleteArticle({ id: scenario.article.one.id })
    const result = await article({ id: original.id })

    expect(result).toEqual(null)
  })
})
