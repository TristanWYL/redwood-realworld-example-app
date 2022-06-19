import { dateFormat } from '../../misc/utils'

// type CommentCardProps = {
//   comment: {
//     updatedAt: Date
//     body: String
//     articleId: number
//     author: {

//     }
//   }
// }

const CommentCard = ({ comment }) => {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <a href="#" className="comment-author">
          <img
            src={comment.author.image}
            className="comment-author-img"
            alt="avatar"
          />
        </a>
        &nbsp;
        <a href="#" className="comment-author">
          {comment.author.username}
        </a>
        <span className="date-posted">{dateFormat(comment.updatedAt)}</span>
      </div>
    </div>
  )
}

export default CommentCard
