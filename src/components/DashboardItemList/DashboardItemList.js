import React, {Component} from 'react'
import TokenService from '../../services/token-service'
import Item from '../Item/Item'
import Context from '../../Context'
import './DashboardItemList.css'
import { getItemsForUser } from '../../Helpers'
import config from '../../config'


export default class DashboardItemList extends Component {
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
        return(
            <section className='DashboardItemList'>
                {TokenService.hasAuthToken()
                    ? <h3>{window.localStorage.getItem(config.USER_NAME)}'s Listings</h3>
                    : <h3>Demo Listings</h3>
                }
                <div className='DasboardList'>
                <ul>
                    {itemsForUser.map(item =>
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
