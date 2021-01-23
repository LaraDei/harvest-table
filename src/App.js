import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import LandingPage from './components/LandingPage/LandingPage'
import Dashboard from './components/Dashboard/Dashboard'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import ItemList from './components/ItemList/ItemList'
import Store from './Store'
import NotFound from './components/NotFound/NotFound'
import './App.css';
import ItemPage from './components/ItemPage/ItemPage'
import context from './Context'

export default class App extends Component {
  static contextType = context
componentDidMount() {
  // fake date loading from API call
  setTimeout(() => this.context.setItemsList(Store.items), 1);
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
            path='/sign-up'
            component={SignUp}
        />
        <Route
            path='/sign-in'
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