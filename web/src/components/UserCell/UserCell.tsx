import { useAuth } from '@redwoodjs/auth'
import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query getUserInfoWithoutPrivacy($username: String!) {
    user: userInfoWithoutPrivacy(username: $username) {
      id
      email
      username
      image
      bio
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
  const isOwnProfile = user.username === currentUser?.username
  const onClickFollowBtn = () => {
    if (isAuthenticated) {
      // follow
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
        <button className="btn btn-sm btn-outline-secondary action-btn">
          <i className="ion-gear-a"></i>
          &nbsp; Edit Profile Settings
        </button>
      ) : (
        <button
          className="btn btn-sm btn-outline-secondary action-btn"
          onClick={onClickFollowBtn}
        >
          <i className="ion-plus-round"></i>
          &nbsp; {`Follow ${user.username}`}
        </button>
      )}
    </>
  )
}
