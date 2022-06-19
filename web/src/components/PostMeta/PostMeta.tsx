import { dateFormat } from '../../misc/utils'
import { Link, routes, navigate } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { useMutation, useQuery } from '@redwoodjs/web'
import { TOGGLE_FAVORITE, TOGGLE_FOLLOW, DELETE_ARTICLE } from 'src/misc/shared'
import { toast } from '@redwoodjs/web/toast'

const PostMeta = ({ post }) => {
  const { isAuthenticated, currentUser } = useAuth()
  const isPostMine = post.author.username === currentUser?.username
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

  const [deleteArticle, { loading: loadingWhenDeleteArticle }] = useMutation(
    DELETE_ARTICLE,
    {
      onError(error) {
        toast.error(error.message)
      },
      onCompleted() {
        navigate(routes.home())
      },
    }
  )

  const onClickFavoriteButton = async () => {
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
  }

  const onClickFollowButton = async () => {
    if (isAuthenticated) {
      if (!loadingWhenUpdateFollow) {
        // [un]favorite
        const response = await changeFollow({
          variables: {
            username: post.author.username,
            follow: !queryFollowedByMeResult?.userRelation?.followedByMe,
          },
        })
        // article = response.data.changeFavorite
      }
    } else {
      navigate(routes.register())
    }
  }

  const onClickDeleteArticleButton = () => {
    deleteArticle({ variables: { id: post.id } })
  }

  const onClickEditArticleButton = () => {
    navigate(routes.tweakArticle({ slug: post.slug }))
  }

  // for working around the issue mentioned in https://github.com/TristanWYL/redwood-realworld-example-app/commit/744fb6ee37ff4121d91b49e7f86e7077f608ee36
  // useQuery is applied specifically for retrieving the 'followedByMe'
  const QUERY = gql`
    query FollowedByMe($username: String!) {
      userRelation(username: $username) {
        id
        followedByMe
      }
    }
  `
  const { data: queryFollowedByMeResult } = useQuery(QUERY, {
    variables: {
      username: post.author.username,
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

      {isPostMine ? (
        <>
          <EditArticleButton onClick={onClickEditArticleButton} />
          &nbsp;&nbsp;
          <DeleteArticleButton
            onClick={onClickDeleteArticleButton}
            loading={loadingWhenDeleteArticle}
          />
        </>
      ) : (
        <>
          <FollowButton
            loading={loadingWhenUpdateFollow}
            followedByMe={queryFollowedByMeResult?.userRelation?.followedByMe}
            onClick={onClickFollowButton}
            username={post.author.username}
          />
          &nbsp;&nbsp;
          <FavoriteButton
            loading={loadingWhenUpdateFavorite}
            favoritedByMe={post.favoritedByMe}
            favoriteCount={post.favoriteCount}
            onClick={onClickFavoriteButton}
          />
        </>
      )}
    </div>
  )
}

const FavoriteButton = ({ loading, favoritedByMe, favoriteCount, onClick }) => {
  return (
    <button
      className={
        (favoritedByMe ? 'btn-primary ' : 'btn-outline-primary ') +
        (loading ? 'disabled ' : '') +
        'btn btn-sm'
      }
      onClick={onClick}
    >
      <i className="ion-heart"></i>
      &nbsp; Favorite Article
      <span className="counter">{` (${favoriteCount})`}</span>
    </button>
  )
}

const FollowButton = ({ loading, followedByMe, onClick, username }) => {
  return (
    <button
      className={
        (followedByMe ? 'btn-secondary ' : 'btn-outline-secondary ') +
        (loading ? 'disabled ' : '') +
        'btn btn-sm'
      }
      onClick={onClick}
    >
      <i className="ion-plus-round"></i>
      &nbsp; {(followedByMe ? 'Unfollow ' : 'Follow ') + username}{' '}
      {/* <span className="counter">(10)</span> */}
    </button>
  )
}

const EditArticleButton = ({ onClick }) => {
  return (
    <button className="btn btn-outline-secondary btn-sm" onClick={onClick}>
      <i className="ion-edit"></i>
      &nbsp; Edit Article
    </button>
  )
}

const DeleteArticleButton = ({ onClick, loading }) => {
  return (
    <button
      className={(loading ? 'disabled ' : '') + 'btn btn-outline-danger btn-sm'}
      onClick={onClick}
    >
      <i className="ion-trash-a"></i>
      &nbsp; Delete Article
    </button>
  )
}

export default PostMeta
