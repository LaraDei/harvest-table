import React from 'react'
import {Link} from 'react-router-dom'
import './NavBar.css'

export default function NavBar() {
    const userId = 1
    return(
        <div className="nav-bar">
            <ul className="menu"> 
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/search'}>Find Produce</Link></li>
                <li><Link to={'/sign-in'}>Sign In</Link></li>
                <li><Link to={'/sign-up'}>Create Account</Link></li>
                <li><Link to={`/user/${userId}`}>Demo</Link></li>
            </ul>
           
        </div>
    )
}