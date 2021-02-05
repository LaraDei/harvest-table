import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import LandingPage from './components/LandingPage/LandingPage'
import Dashboard from './components/Dashboard/Dashboard'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import NotFound from './components/NotFound/NotFound'
import ItemPage from './components/ItemPage/ItemPage'
import Context from './Context'
import ListingsApiService from './services/listings-api-service'
import './App.css';
import AddItem from './components/AddItem/AddItem'
import logo from './img/Untitled.png'
import SearchPage from './components/SearchPage/SearchPage'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
        error: null
    }
}

  static contextType = Context

  componentDidMount() {
    ListingsApiService.getListings()
        .then(this.context.setItemsList)
        .catch(res => {
          this.setState({ error: res.error })
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
            component={SearchPage}
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
    const { error } = this.state
    return (
      <div className="App">
        <NavBar/>
        <main className="app-main">
        <section className="regError" role='alert'>{error}</section>
          {this.renderMainRoutes()}
        </main>
        <footer className="HTLogo"><img src={logo} alt="lemon logo" style={{width:"40px", height:"40px"}}/> Harvest Table</footer>
      </div>
    )
  }
}