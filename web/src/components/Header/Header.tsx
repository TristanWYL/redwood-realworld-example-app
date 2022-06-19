import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'

const availableLinks = ['login', 'register', 'editor', 'settings', '@']

const Header = () => {
  const { isAuthenticated, currentUser } = useAuth()

  let curLink = ''
  for (let i = 0; i < availableLinks.length; i++) {
    if (window.location.pathname.includes(availableLinks[i])) {
      curLink = availableLinks[i]
      break
    }
  }
  // console.log(curLink)
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to={routes.home()}>
          conduit
        </Link>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            {/* Add "active" className when you're on that page" */}
            <Link
              className={(curLink === '' ? 'active' : '') + ' nav-link'}
              to={routes.home()}
            >
              Home
            </Link>
          </li>
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link
                  className={
                    (curLink === 'editor' ? 'active' : '') + ' nav-link'
                  }
                  to={routes.createArticle()}
                >
                  <i className="ion-compose"></i>&nbsp;New Article
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    (curLink === 'settings' ? 'active' : '') + ' nav-link'
                  }
                  to={routes.settings()}
                >
                  <i className="ion-gear-a"></i>&nbsp;Settings
                </Link>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <Link
                  className={
                    (curLink === 'login' ? 'active' : '') + ' nav-link'
                  }
                  to={routes.login()}
                >
                  Sign in
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    (curLink === 'register' ? 'active' : '') + ' nav-link'
                  }
                  to={routes.register()}
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li className="nav-item">
              <Link
                className={(curLink === '@' ? 'active' : '') + ' nav-link'}
                to={routes.profile({ username: currentUser?.username ?? '' })}
              >
                {currentUser?.username}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Header
