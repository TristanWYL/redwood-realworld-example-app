import { Link, routes, navigate } from '@redwoodjs/router'
import { dateFormat } from '../../../utils'
import { useAuth } from '@redwoodjs/auth'

const PostCard = ({ article }) => {
  const { isAuthenticated, currentUser } = useAuth()
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={routes.profile({ username: article.author.username })}>
          <img src={article.author.image} alt="avatar" />
        </Link>
        <div className="info">
          <Link
            to={routes.profile({ username: article.author.username })}
            className="author"
          >
            {article.author.username}
          </Link>
          <span className="date">{dateFormat(article.updatedAt)}</span>
        </div>
        <button
          className={
            article.favoritedByMe
              ? 'active '
              : '' + 'btn btn-outline-primary btn-sm pull-xs-right'
          }
          onClick={() => {
            if (isAuthenticated) {
              // follow
            } else {
              navigate(routes.register())
            }
          }}
        >
          <i className="ion-heart"></i> {article.favoriteCount}
        </button>
      </div>
      <Link to={routes.post({ slug: article.slug })} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList?.map((tag) => (
            <li className="tag-default tag-pill tag-outline" key={tag.name}>
              {tag.name}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  )
}

export default PostCard
