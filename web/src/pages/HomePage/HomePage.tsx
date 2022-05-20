import { Link, routes } from '@redwoodjs/router'
import { useQuery } from '@redwoodjs/web'
import PostCard from 'src/components/PostCard/PostCard'
import TopTagsCell from 'src/components/TopTagsCell'
import PostsPage from 'src/components/PostsPage/PostsPage'
import store, { tabSwitch } from 'src/Store'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const curTab = useSelector((state) => state.selectedTab)
  const tag = useSelector((state) => state.tag)
  return (
    <>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <div
                      className={
                        (curTab === 'feed' ? 'active' : '') + ' nav-link'
                      }
                      tabIndex={0}
                      role="button"
                      onKeyUp={() => {}}
                      onClick={() => {
                        if (curTab !== 'feed') {
                          store.dispatch(tabSwitch('feed', 'feed'))
                        }
                      }}
                    >
                      Your Feed
                    </div>
                  </li>
                  <li className="nav-item">
                    <div
                      className={
                        (curTab === 'global' ? 'active' : '') + ' nav-link'
                      }
                      tabIndex={0}
                      role="button"
                      onKeyUp={() => {}}
                      onClick={() => {
                        if (curTab !== 'global') {
                          store.dispatch(tabSwitch('global', 'global'))
                        }
                      }}
                    >
                      Global Feed
                    </div>
                  </li>
                  {curTab === 'tag' && (
                    <li className="nav-item">
                      <div className="active nav-link">{`#${tag}`}</div>
                    </li>
                  )}
                </ul>
              </div>
              <PostsPage tag={tag} />
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <div className="tag-list">
                  <TopTagsCell />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage
