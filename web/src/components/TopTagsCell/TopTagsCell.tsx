import type { TopTagsQuery } from 'types/graphql'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import store, { tabSwitch } from 'src/Store'

export const QUERY = gql`
  query TopTagsQuery($username: String) {
    topTags(username: $username) {
      name
    }
  }
`
export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No Tags</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ topTags }: CellSuccessProps<TopTagsQuery>) => {
  return (
    <>
      {topTags.map((item) => (
        <div
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
          onClick={() => {
            store.dispatch(tabSwitch('tag', item.name))
          }}
          className="tag-pill tag-default"
          key={item.name}
        >
          {item.name}
        </div>
      ))}
    </>
  )
}
