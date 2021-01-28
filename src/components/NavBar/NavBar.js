import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import Context from '../../Context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TokenService from '../../services/token-service'
import { faBars } from'@fortawesome/free-solid-svg-icons'
import config from '../../config'
import './NavBar.css'

export default class NavBar extends Component {
    static contextType = Context  

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.context.handleLog()
      }
    
      renderLogoutLink() {
        return (
          <div className='Header__logged-in'>
            <Link
              onClick={this.handleLogoutClick}
              to='/'>
              Logout
            </Link>
          </div>
        )
      }
    
      renderLoginLink() {
        return (
          <div className='Header__not-logged-in'>
            <Link
              to='/login'>
              Login
            </Link>
          </div>
        )
      }

      renderUserLink() {
        return (
          <div className='Header__dashboard-logged-in'>
            <Link
              to={`/user/${window.localStorage.getItem(config.USER_ID)}`}>
              Dashboard
            </Link>
          </div>
        )
      }

    renderDemoLink() {
      return (
        <div className='Header__dashboard-demo'>
          <Link
            to='/user/demo'>
            Demo
          </Link>
        </div>
      )
    }

    handleNav() {
        var x = document.getElementById("menu");
        if (x.className === "menu") {
            x.className += " responsive";
        } else {
            x.className = "menu";
        }
    }

    render(){
        return(
            <div className="nav-bar">
                <div className='icon-wrapper'>
                    <button className='icon' id='nav-button' onClick={e => this.handleNav()}><FontAwesomeIcon icon={faBars}/>{' '}NavMenu</button>
                </div>
                <ul className="menu"> 
                    <li><Link to={'/'}>Harvest Table</Link></li>
                    <li>{TokenService.hasAuthToken()
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()}
                    </li>
                    <li><Link to={'/search'}>Find Produce</Link></li>
                    <li>{TokenService.hasAuthToken()
                        ? null
                        : <Link to={'/register'}>Create Account</Link>}
                    </li>
                    <li>{TokenService.hasAuthToken()
                        ? this.renderUserLink()
                        : this.renderDemoLink()} 
                    </li>
                </ul>
            
            </div>
        )
    }
}