import { useQuery } from '@redwoodjs/web'
import { useContext, useEffect } from 'react'
import { CommentContext } from 'src/misc/CommentContextProvider'
import CommentCard from '../CommentCard/CommentCard'

const QUERY = gql`
  query CommentsQuery($articleId: Int!) {
    comments: getCommentsByArticleId(articleId: $articleId) {
      id
      createdAt
      updatedAt
      body
      articleId
      author {
        id
        username
        image
      }
    }
  }
`

const CommentList = ({ articleId }) => {
  const { update } = useContext(CommentContext)
  const { loading, error, data, refetch } = useQuery(QUERY, {
    variables: {
      articleId,
    },
  })
  useEffect(() => {
    update({
      refetch: () => {
        refetch()
      },
    })
  }, [])
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
  // console.log(data)
  if (!data || !data.comments || data.comments.length === 0) {
    return <div style={{ padding: '30px' }}>No comments.</div>
  }
  return data.comments.map((comment) => (
    <CommentCard comment={comment} key={comment.id} />
  ))
}

export default CommentList
