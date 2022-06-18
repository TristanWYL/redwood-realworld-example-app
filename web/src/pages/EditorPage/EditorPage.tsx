import { useQuery } from '@redwoodjs/web'
import PostEditor from 'src/components/PostEditor/PostEditor'

const QUERY = gql`
  query queryArticleBySlug($slug: String!) {
    post: queryArticleBySlug(slug: $slug) {
      id
      slug
      title
      description
      body
      tagList {
        name
      }
    }
  }
`

const EditorPage = ({ slug }) => {
  let post
  let loading = false
  let error
  if (slug) {
    const {
      loading: loadingQuery,
      error: errorWhenQuery,
      data,
      // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useQuery(QUERY, {
      variables: {
        slug,
      },
    })
    post = data?.post
    loading = loadingQuery
    error = errorWhenQuery
  }

  if (loading) {
    return <div style={{ padding: '30px' }}>Loading comments ...</div>
  }
  if (error) {
    return (
      <div style={{ padding: '30px', color: 'red' }}>
        Error for loading comments: {error.message}
      </div>
    )
  }
  return <PostEditor post={post} />
}

export default EditorPage
