import { dateFormat } from '../../../utils'

const PostMeta = ({ post }) => {
  return (
    <div className="article-meta">
      <a href="">
        <img src={post.author.image} alt="avatar" />
      </a>
      <div className="info">
        <a href="" className="author">
          {post.author.username}
        </a>
        <span className="date">{dateFormat(post.updatedAt)}</span>
      </div>
      <button className="btn btn-sm btn-outline-secondary">
        <i className="ion-plus-round"></i>
        &nbsp; Follow Eric Simons <span className="counter">(10)</span>
      </button>
      &nbsp;&nbsp;
      <button className="btn btn-sm btn-outline-primary">
        <i className="ion-heart"></i>
        &nbsp; Favorite Post <span className="counter">(29)</span>
      </button>
    </div>
  )
}

export default PostMeta
