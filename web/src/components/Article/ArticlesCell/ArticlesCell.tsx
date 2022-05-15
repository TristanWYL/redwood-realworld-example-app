import type { FindArticles } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import { Link, routes } from '@redwoodjs/router'

import Articles from 'src/components/Article/Articles'

export const QUERY = gql`
  query FindArticles {
    articles {
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No articles yet. '}
      <Link
        to={routes.newArticle()}
        className="rw-link"
      >
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ articles }: CellSuccessProps<FindArticles>) => {
  return <Articles articles={articles} />
}
