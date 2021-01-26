import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import './DashboardNav.css'

export default class DashboardNav extends Component{
    
    render(){

        return(
            <div className='DashboardNav' id='DashboardNav'>
                <NavLink
                exact
                    className='DashboardNav-link'
                    to={`/user/:userId/items`}
                >
                    Your Listings
                </NavLink>
                <NavLink
                    className='DashboardNav-link'
                    to={`/user/:userId/create-listing`}
                >
                    Create Listing
                </NavLink>
                
            </div>
        )
    }
}