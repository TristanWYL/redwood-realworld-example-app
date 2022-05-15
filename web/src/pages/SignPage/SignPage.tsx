import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { useLocation } from 'react-router-dom'

// type SignPageProps = {
//   isSignInPage: boolean
// }

const SignPage = () => {
  // const location = useLocation()
  const isSignInPage = window.location.href.includes('login')
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">
              Sign {isSignInPage ? 'in' : 'up'}
            </h1>
            <p className="text-xs-center">
              <Link to={isSignInPage ? routes.register() : routes.login()}>
                {isSignInPage ? 'Need' : 'Have'} an account?
              </Link>
            </p>

            <ul className="error-messages">
              <li>That email is already taken</li>
            </ul>

            <form>
              {!isSignInPage && (
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Your Name"
                  />
                </fieldset>
              )}
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign {isSignInPage ? 'in' : 'up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignPage
