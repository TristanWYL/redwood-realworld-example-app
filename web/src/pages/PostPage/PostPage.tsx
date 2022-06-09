import { Link, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import CommentList from 'src/components/CommentList/CommentList'
import CommentSubmitBox from 'src/components/CommentSubmitBox/CommentSubmitBox'
import FullPost from 'src/components/FullPost/FullPost'

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
  return <FullPost post={data.post} />
}

export default PostPage
