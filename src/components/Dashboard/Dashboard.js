import React, {Component} from 'react'
import {Route} from 'react-router-dom'
// import {getItemsForUser} from '../../Helpers'
// import Item from '../Item/Item'
import DashboardItemList from '../DashboardItemList/DashboardItemList'
import DashboardNav from '../DashboardNav/DashboardNav'
import AddItem from '../AddItem/AddItem'
import Context from '../../Context'

export default class Dashboard extends Component{
    static contextType = Context


    renderNavDashRoutes() {
        return (
           <>
             {['/user/:userId', '/user/:userId/create-listing', '/user/:userId/items' ].map(path => (
                  <Route
                 exact
                     key={path}
                     path={path}
                     component={DashboardNav}
                 />
             ))}
           </>
         )
       }

       renderMainDashRoutes(){
        return(
          <>
            <Route exact path='/user/:userId' component={DashboardItemList}/>
            <Route path='/user/:userId/items' component={DashboardItemList}/>
            <Route path='/user/:userId/create-listing' component={AddItem}/>
          </>
        )
    }

    render(){
      return(
          <div className='Dashboard'>
              <div className='Dashboard-nav'>
                {this.renderNavDashRoutes()}
              </div>
              <div className="dashboard-main">
                  {this.renderMainDashRoutes()}
              </div>
          </div>
      )
    }
}


