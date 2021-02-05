import React, {Component} from 'react'
import Context from '../../Context'
import './SearchPage.css'
import Map from '../Map/Map'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSearch, faTimesCircle, faBars } from'@fortawesome/free-solid-svg-icons'
import ItemList from '../ItemList/ItemList'
import Pagination from '../Pagination/Pagination'

export default class SearchPage extends Component {
    static contextType = Context

    constructor(props){
        super(props)
        this.state={
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
        this.setState({
            filteredListings: filteredListings,
            currentPage: 1
        })
    };

    closeList() {
        document.getElementById("item-list-group").classList.remove('open')
    };

    openList(){
        document.getElementById("item-list-group").classList.add('open')
        this.setState({
            filteredListings: this.context.items,
            currentPage: 1
        })
    }

    render(){
        const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const currentItems = this.state.filteredListings.slice(indexOfFirstItem, indexOfLastItem) || { content: '' };
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
                            <label id="search" htmlFor="search">Search: </label>
                            <input aria-labelledby="search" type="search" placeholder="Search.." name="search"/>
                            <button type="submit"><FontAwesomeIcon icon={faSearch} />Search</button>
                        </form>
                    </div>
                    <ItemList items={currentItems}/>
                    <Pagination
                        itemsPerPage={this.state.itemsPerPage}
                        totalItems={this.state.filteredListings.length}
                        paginate={paginate}
                    />
                </div>
                <div className="map-group">
                <button className='item-list-btn'  onClick={e => this.openList()} ><FontAwesomeIcon icon={faBars}/>{' '}List</button>
                <Map/>
                </div>
            </div>
        )
    }
}