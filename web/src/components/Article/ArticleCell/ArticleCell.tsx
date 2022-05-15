import type { FindArticleById } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Article from 'src/components/Article/Article'

export const QUERY = gql`
  query FindArticleById($id: Int!) {
    article: article(id: $id) {
      id
      slug
      title
      description
      body
      createdAt
      updatedAt
      authorId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Article not found</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ article }: CellSuccessProps<FindArticleById>) => {
  return <Article article={article} />
}
