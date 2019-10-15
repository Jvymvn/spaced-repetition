import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div>
        <span id="username">
          User: {this.context.user.name}
        </span>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/login' className='btn'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav>
        <Link to='/login' className='btn'>Login</Link>
        {' '}
        <Link to='/register' className='btn'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header id="showcase" className="grid">
        <div className='bg-image'></div>
        <div className="content-wrap">
          <h1>
            <Link to='/' id="link-title">
              Spaced repetition
          </Link>
          </h1>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </div>
      </header>
    );
  }
}

export default Header
