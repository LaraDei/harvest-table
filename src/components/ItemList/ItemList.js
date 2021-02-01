import React, {Component} from 'react'
//import {Route, Link} from 'react-router-dom'
import Item from '../Item/Item'
import Context from '../../Context'
import './ItemList.css'
import Map from '../Map/Map'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSearch } from'@fortawesome/free-solid-svg-icons'
// import ListingsApiService from '../../services/listings-api-service'

export default class ItemList extends Component {
    static defaultProps = {
        match: {
          params: {}
        }
    }
    static contextType = Context

    constructor(props){
        super(props)
        this.state={
            filteredListings: []
        }
    }
    
  componentDidMount() {
    this.setState({filteredListings : this.context.items})
  }
  

    handleSearch = e => {
        e.preventDefault()
        const {search} = e.target
        const term = search.value.toLowerCase()
        const {items=[]} = this.context
        const filteredListings = items.filter(listing =>
            listing.title.toLowerCase().includes(term))
        this.setState({filteredListings: filteredListings})
    }

    render(){
        const {items=[]} = this.context
        const listings = this.state.filteredListings
        console.log(listings)
        console.log(items)
        return(
            <div className="searchPage">
                <div className="search-container">
                    <form onSubmit={this.handleSearch} >
                    <input type="search" placeholder="Search.." name="search"/>
                    <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                    </form>
                </div>
                <section className='ItemList'>
                    <ul>
                        {this.state.filteredListings.map(item =>
                            <li key={item.id}>
                            <Item
                                {...item}
                            />
                            </li>
                        )}
                    </ul>
                    <div className='mapcontainer'><Map/></div>
                </section>
            </div>
        )
    }
}

