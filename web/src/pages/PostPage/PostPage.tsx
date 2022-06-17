import { useQuery } from '@redwoodjs/web'
import FullPost from 'src/components/FullPost/FullPost'
import { useAuth } from '@redwoodjs/auth'

const QUERY = gql`
  query FindPostBySlug($slug: String!, $me: String) {
    post: queryArticleBySlug(slug: $slug, me: $me) {
      id
      slug
      title
      description
      body
      updatedAt
      tagList {
        name
      }
      author {
        id
        username
        image
        followedByMe
      }
      favoriteCount
      favoritedByMe
    }
  }
`
const PostPage = ({ slug }) => {
  const { currentUser } = useAuth()
  const { loading, error, data } = useQuery(QUERY, {
    variables: {
      slug,
      me: currentUser?.username,
    },
  })
  if (loading) {
    return <div style={{ padding: '30px' }}>Loading...</div>
  }
  if (error) {
    return (
      <div style={{ padding: '30px', color: 'red' }}>
        Error: {error.message}
      </div>
    )
  }
  return <FullPost post={data.post} />
}

export default PostPage
