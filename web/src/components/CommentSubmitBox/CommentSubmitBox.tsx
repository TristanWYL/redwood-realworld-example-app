const CommentSubmitBox = ({ article }) => {
  return (
    <form className="card comment-form">
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div className="card-footer">
        <img
          src={article.author.image}
          className="comment-author-img"
          alt="avatar"
        />
        <button className="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  )
}

export default CommentSubmitBox
