import { useState } from 'react'
import PostList from 'src/components/PostList/PostList'
import UserCell from 'src/components/UserCell'

type Tab = 'my' | 'fav'

const ProfilePage = ({ username }: { username: string }) => {
  const [curTab, setCurTab] = useState<Tab>('my')
  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <UserCell username={username} />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <div
                    className={(curTab === 'my' ? 'active ' : '') + 'nav-link'}
                    tabIndex={0}
                    role="button"
                    onKeyUp={() => {}}
                    onClick={() => {
                      if (curTab !== 'my') {
                        setCurTab('my')
                      }
                    }}
                  >
                    My Articles
                  </div>
                </li>
                <li className="nav-item">
                  <div
                    className={(curTab === 'fav' ? 'active ' : '') + 'nav-link'}
                    tabIndex={0}
                    role="button"
                    onKeyUp={() => {}}
                    onClick={() => {
                      if (curTab !== 'fav') {
                        setCurTab('fav')
                      }
                    }}
                  >
                    Favorited Articles
                  </div>
                </li>
              </ul>
            </div>

            {curTab === 'my' ? (
              <PostList username={username}></PostList>
            ) : (
              <PostList username={username} favorited={true}></PostList>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
