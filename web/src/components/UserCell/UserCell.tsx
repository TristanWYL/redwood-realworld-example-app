import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { TOGGLE_FOLLOW } from 'src/misc/shared'
import { toast } from '@redwoodjs/web/toast'

export const QUERY = gql`
  query getUserInfo($username: String!) {
    user: userRelation(username: $username) {
      id
      email
      username
      image
      bio
      followedByMe
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ user }: CellSuccessProps) => {
  const { isAuthenticated, currentUser } = useAuth()
  const [changeFollow, { loading: loadingWhenUpdateFollow }] = useMutation(
    TOGGLE_FOLLOW,
    {
      onError(error) {
        toast.error(error.message)
      },
    }
  )
  const isOwnProfile = user.username === currentUser?.username
  const onClickFollowBtn = async () => {
    if (isAuthenticated) {
      if (!loadingWhenUpdateFollow) {
        // [un]follow
        const response = await changeFollow({
          variables: {
            username: user.username,
            follow: !user.followedByMe,
          },
        })
        // article = response.data.changeFavorite
      }
    } else {
      navigate(routes.register())
    }
  }
  return (
    <>
      <img src={user.image} className="user-img" alt="avatar" />
      <h4>{user.username}</h4>
      <p>{user.bio}</p>
      {isOwnProfile ? (
        <button
          className="btn btn-sm btn-outline-secondary action-btn"
          onClick={() => navigate(routes.settings())}
        >
          <i className="ion-gear-a"></i>
          &nbsp; Edit Profile Settings
        </button>
      ) : (
        <button
          className={
            (loadingWhenUpdateFollow ? 'disabled ' : '') +
            'btn btn-sm btn-outline-secondary action-btn'
          }
          onClick={onClickFollowBtn}
        >
          <i className="ion-plus-round"></i>
          &nbsp;{' '}
          {(user.followedByMe ? 'Unfollow ' : 'Follow ') + `${user.username}`}
        </button>
      )}
    </>
  )
}
