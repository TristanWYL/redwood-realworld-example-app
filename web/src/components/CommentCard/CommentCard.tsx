import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { dateFormat } from '../../misc/utils'
import { useMutation } from '@redwoodjs/web'
import { useContext } from 'react'
import { CommentContext } from 'src/misc/CommentContextProvider'
import { toast } from '@redwoodjs/web/dist/toast'

type CommentCardProps = {
  comment: {
    id
    updatedAt: Date
    body: string
    articleId: number
    author: {
      username
      image
    }
  }
}

const Delete_ARTICLE = gql`
  mutation DeleteCommentMutation($id: Int!) {
    deleteComment(id: $id) {
      id
    }
  }
`

const CommentCard = ({ comment }: CommentCardProps) => {
  const { currentUser } = useAuth()
  const { refetch } = useContext(CommentContext)
  const [deleteComment, { loading: loadingDelete }] = useMutation(
    Delete_ARTICLE,
    {
      onCompleted: () => {
        refetch()
      },
      onError(error) {
        toast.error(error.message)
        refetch()
      },
    }
  )
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={routes.profile({ username: comment.author.username })}
          className="comment-author"
        >
          <img
            src={comment.author.image}
            className="comment-author-img"
            alt="avatar"
          />
        </Link>
        &nbsp;
        <Link
          to={routes.profile({ username: comment.author.username })}
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <span className="date-posted">{dateFormat(comment.updatedAt)}</span>
        {currentUser?.username === comment.author.username && (
          <span className="mod-options">
            <i
              className={(loadingDelete ? 'disabled ' : '') + 'ion-trash-a'}
              onClick={() => {
                deleteComment({ variables: { id: comment.id } })
              }}
              onKeyDown={() => {}}
              role={'button'}
              tabIndex={0}
            ></i>
          </span>
        )}
      </div>
    </div>
  )
}

export default CommentCard
