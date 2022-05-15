import { Link, routes } from '@redwoodjs/router'
import { useState } from 'react'

const availableLinks = ['login', 'register', '']

const Header = () => {
  let curLink = ''
  for (let i = 0; i < availableLinks.length; i++) {
    if (window.location.href.includes(availableLinks[i])) {
      curLink = availableLinks[i]
      break
    }
  }
  console.log(curLink)
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="index.html">
          conduit
        </a>
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
          <li className="nav-item">
            <a className="nav-link" href="">
              <i className="ion-compose"></i>&nbsp;New Article
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              <i className="ion-gear-a"></i>&nbsp;Settings
            </a>
          </li>
          <li className="nav-item">
            <Link
              className={(curLink === 'login' ? 'active' : '') + ' nav-link'}
              to={routes.login()}
            >
              Sign in
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={(curLink === 'register' ? 'active' : '') + ' nav-link'}
              to={routes.register()}
            >
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Header
