import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './DashboardNav.css'
import config from '../../config'
import TokenService from '../../services/token-service'

export default class DashboardNav extends Component{
    
    render(){

        return(
            <div className='DashboardNav' id='DashboardNav'>
                <NavLink
                exact
                    className='DashboardNav-link'
                    to={TokenService.hasAuthToken() ? `/user/${window.localStorage.getItem(config.USER_ID)}`: `/user/1`}
                >
                    Your Listings
                </NavLink>
                <NavLink
                    className='DashboardNav-link'
                    to={`/create-listing`}
                >
                    Create Listing
                </NavLink>
                
            </div>
        )
    }
}