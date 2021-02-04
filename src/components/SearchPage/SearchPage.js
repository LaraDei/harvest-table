import React, {Component} from 'react'
//import {Route, Link} from 'react-router-dom'
import Item from '../Item/Item'
import Context from '../../Context'
import './SearchPage.css'
import Map from '../Map/Map'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSearch, faTimesCircle, faBars } from'@fortawesome/free-solid-svg-icons'
// import ListingsApiService from '../../services/listings-api-service'
import ItemList from '../ItemList/ItemList'
import Pagination from '../Pagination/Pagination'

export default class SearchPage extends Component {
    static contextType = Context

    constructor(props){
        super(props)
        this.state={
            itemId: 1,
            filteredListings: [],
            loading: true,
            currentPage: 1,
            itemsPerPage: 5,
        }
    };
    
    componentDidMount() {
    this.setState({
        filteredListings: this.context.items,
        loading: false
    })
    };

    handleSearch = e => {
        e.preventDefault()
        const {search} = e.target
        const term = search.value.toLowerCase()
        const {items=[]} = this.context
        const filteredListings = items.filter(listing =>
            listing.title.toLowerCase().includes(term))
        this.setState({filteredListings: filteredListings})
    };

    closeList() {
        document.getElementById("item-list-group").style.width = "0"
    };

    openList(){
        document.getElementById("item-list-group").style.width = "90%";
    }

    render(){
        const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const currentItems = this.state.filteredListings.slice(indexOfFirstItem, indexOfLastItem);
        const paginate = pageNumber => this.setState({currentPage: pageNumber});
        return(
            <div className="searchPage">
                <div className="item-list-group" id="item-list-group">
                    <div className="closeContainer">
                        <button className="closebtn" onClick={e => this.closeList()}>
                            <FontAwesomeIcon icon={faTimesCircle} />
                            <label className="close" htmlFor='close'> close</label>
                        </button>
                    </div>
                    <div className="search-container">
                        <form onSubmit={this.handleSearch} >
                            <input type="search" placeholder="Search.." name="search"/>
                            <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                        </form>
                    </div>
                    <ItemList items={currentItems} loading={this.state.loading}/>
                    <Pagination
                        itemsPerPage={this.state.itemsPerPage}
                        totalItems={this.state.filteredListings.length}
                        paginate={paginate}
                    />
                </div>
                <button className='item-list-btn'  onClick={e => this.openList()} ><FontAwesomeIcon icon={faBars}/>{' '}List</button>
                <Map/>
            </div>
        )
    }
}