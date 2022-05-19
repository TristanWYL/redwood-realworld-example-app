import { Link, routes } from '@redwoodjs/router'

const PostCard = ({ article }) => {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={routes.profile()}>
          <img src={article.author.image} alt="avatar" />
        </Link>
        <div className="info">
          <Link to={routes.profile()} className="author">
            {article.author.username}
          </Link>
          <span className="date">{article.updatedAt}</span>
        </div>
        <button className="btn active btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favoriteCount}
        </button>
      </div>
      <Link to={routes.article({ id: 1 })} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  )
}

export default PostCard
