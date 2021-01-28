import React, {Component} from 'react'
import {Route} from 'react-router-dom'
// import {getItemsForUser} from '../../Helpers'
// import Item from '../Item/Item'
import DashboardItemList from '../DashboardItemList/DashboardItemList'
import DashboardNav from '../DashboardNav/DashboardNav'
import AddItem from '../AddItem/AddItem'
import Context from '../../Context'
import config from '../../config'

export default class Dashboard extends Component{
    static contextType = Context


    renderNavDashRoutes() {
        return (
           <>
             {['/user/:userId', '/create-listing'].map(path => (
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
            <Route exact path='/create-listing' component={AddItem}/>
          </>
        )
    }

    render(){
      console.log(config.TOKEN_KEY)
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


