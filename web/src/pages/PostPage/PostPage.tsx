import { useQuery } from '@redwoodjs/web'
import FullPost from 'src/components/FullPost/FullPost'
import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'

const QUERY = gql`
  query FindPostBySlug($slug: String!) {
    post: queryArticleBySlug(slug: $slug) {
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
  if (!data.post) {
    navigate(routes.home())
    return <></>
  }
  return <FullPost post={data.post} />
}

export default PostPage
