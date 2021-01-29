import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import LandingPage from './components/LandingPage/LandingPage'
import Dashboard from './components/Dashboard/Dashboard'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import ItemList from './components/ItemList/ItemList'
import NotFound from './components/NotFound/NotFound'
import ItemPage from './components/ItemPage/ItemPage'
import Context from './Context'
import ListingsApiService from './services/listings-api-service'
import './App.css';
import AddItem from './components/AddItem/AddItem'

export default class App extends Component {

  static contextType = Context

  componentDidMount() {
    ListingsApiService.getListings()
        .then(this.context.setItemsList)
        .catch(error => {
          console.error({error});
        })
  }
  
  renderMainRoutes(){
    return(
      <>
      <Switch>
        <Route
            exact
            path='/'
            component={LandingPage}
        />
        <Route
            path='/user/:userId'
            component={Dashboard}
        />
        <Route
            path='/register'
            component={SignUp}
        />
        <Route
            path='/login'
            component={SignIn}
        />
         <Route
            path='/search'
            component={ItemList}
        />
        <Route
            path="/item/:itemId"
            component={ItemPage}
        />
        <Route
            path="/create-listing"
            component={AddItem}
        />
        <Route exact path='*' component={NotFound} />
        </Switch>
      </>
    )
}

  render(){
    return (
      <div className="App">
        <NavBar/>
        <main className="app-main">
          {this.renderMainRoutes()}
        </main>
        <footer>Harvest Table</footer>
      </div>
    )
  }
}