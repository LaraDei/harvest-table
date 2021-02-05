import React, {Component} from 'react'
import TokenService from '../../services/token-service'
import Item from '../Item/Item'
import Context from '../../Context'
import './DashboardItemList.css'
import { getItemsForUser } from '../../Helpers'
import config from '../../config'
import Pagination from '../Pagination/Pagination'


export default class DashboardItemList extends Component {
    constructor(props){
        super(props)
        this.state={
            currentPage: 1,
            itemsPerPage: 5,
        }
    };
    static defaultProps = {
        match: {
          params: {}
        }
    }
    static contextType = Context
    render(){
        const {items=[]} = this.context
        const  {userId} = this.props.match.params
        const itemsForUser = getItemsForUser(items, userId) || { content: '' }
        const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage;
        const currentItems = itemsForUser.slice(indexOfFirstItem, indexOfLastItem);
        const paginate = pageNumber => this.setState({currentPage: pageNumber});
        return(
            <section className='DashboardItemList'>
                {TokenService.hasAuthToken()
                    ? <h3>{window.localStorage.getItem(config.USER_NAME)}'s Listings</h3>
                    : <h3>Demo Listings</h3>
                }
                <Pagination
                        itemsPerPage={this.state.itemsPerPage}
                        totalItems={itemsForUser.length}
                        paginate={paginate}
                    />
                <div className='DasboardList'>
                <ul>
                    {currentItems.map(item =>
                        <li key={item.id}>
                        <Item
                            {...item}
                        />
                        </li>
                    )}
                </ul>
                </div>
            </section>
        )
    }
}
