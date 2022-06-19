import { Link, routes, navigate } from '@redwoodjs/router'
import { dateFormat } from '../../misc/utils'
import { useAuth } from '@redwoodjs/auth'
import { useMutation } from '@redwoodjs/web'
import { TOGGLE_FAVORITE } from 'src/misc/shared'
import { toast } from '@redwoodjs/web/toast'

const PostCard = ({ post }) => {
  const { isAuthenticated, currentUser } = useAuth()
  const [changeFavorite, { loading }] = useMutation(TOGGLE_FAVORITE, {
    onError(error) {
      toast.error(error.message)
    },
  })

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={routes.profile({ username: post.author.username })}>
          <img src={post.author.image} alt="avatar" />
        </Link>
        <div className="info">
          <Link
            to={routes.profile({ username: post.author.username })}
            className="author"
          >
            {post.author.username}
          </Link>
          <span className="date">{dateFormat(post.updatedAt)}</span>
        </div>
        <button
          className={
            (post.favoritedByMe ? 'btn-primary ' : 'btn-outline-primary ') +
            (loading ? 'disabled ' : '') +
            'btn btn-sm pull-xs-right'
          }
          onClick={async () => {
            if (isAuthenticated) {
              if (!loading) {
                // [un]favorite
                const response = await changeFavorite({
                  variables: {
                    username: currentUser.username,
                    slug: post.slug,
                    favorite: !post.favoritedByMe,
                  },
                })
                // article = response.data.changeFavorite
              }
            } else {
              navigate(routes.register())
            }
          }}
        >
          <i className="ion-heart"></i> {post.favoriteCount}
        </button>
      </div>
      <Link to={routes.post({ slug: post.slug })} className="preview-link">
        <h1>{post.title}</h1>
        <p>{post.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {post.tagList?.map((tag) => (
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
