import { dateFormat } from '../../../utils'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useMutation, useQuery } from '@redwoodjs/web'
import { TOGGLE_FAVORITE, TOGGLE_FOLLOW } from 'src/misc/shared'
import { toast } from '@redwoodjs/web/toast'

const PostMeta = ({ post }) => {
  const { isAuthenticated, currentUser } = useAuth()
  const [changeFavorite, { loading: loadingWhenUpdateFavorite }] = useMutation(
    TOGGLE_FAVORITE,
    {
      onError(error) {
        toast.error(error.message)
      },
    }
  )

  const [changeFollow, { loading: loadingWhenUpdateFollow }] = useMutation(
    TOGGLE_FOLLOW,
    {
      onError(error) {
        toast.error(error.message)
      },
    }
  )

  // for working around the issue mentioned in https://github.com/TristanWYL/redwood-realworld-example-app/commit/744fb6ee37ff4121d91b49e7f86e7077f608ee36
  // useQuery is applied specifically for retrieving the 'followedByMe'
  const QUERY = gql`
    query FollowedByMe($username: String!, $me: String!) {
      userRelation(username: $username, me: $me) {
        id
        followedByMe
      }
    }
  `
  const {
    loading,
    error,
    data: queryFollowedByMeResult,
  } = useQuery(QUERY, {
    variables: {
      username: post.author.username,
      me: currentUser?.username,
    },
  })
  return (
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
          (queryFollowedByMeResult?.userRelation?.followedByMe
            ? 'btn-primary '
            : 'btn-outline-primary ') +
          (loadingWhenUpdateFollow ? 'disabled ' : '') +
          'btn btn-sm'
        }
        onClick={async () => {
          if (isAuthenticated) {
            if (!loadingWhenUpdateFollow) {
              // [un]favorite
              const response = await changeFollow({
                variables: {
                  username: post.author.username,
                  me: currentUser.username,
                  follow: !post.author.followedByMe,
                },
              })
              // article = response.data.changeFavorite
            }
          } else {
            navigate(routes.register())
          }
        }}
      >
        <i className="ion-plus-round"></i>
        &nbsp; {`Follow ${post.author.username}`}{' '}
        {/* <span className="counter">(10)</span> */}
      </button>
      &nbsp;&nbsp;
      <button
        className={
          (post.favoritedByMe ? 'btn-primary ' : 'btn-outline-primary ') +
          (loadingWhenUpdateFavorite ? 'disabled ' : '') +
          'btn btn-sm'
        }
        onClick={async () => {
          if (isAuthenticated) {
            if (!loadingWhenUpdateFavorite) {
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
        <i className="ion-heart"></i>
        &nbsp; Favorite Article
        <span className="counter">{` (${post.favoriteCount})`}</span>
      </button>
    </div>
  )
}

export default PostMeta
