import React, {Component} from 'react'
//import {Route, Link} from 'react-router-dom'
import Item from '../Item/Item'
import Context from '../../Context'
import './ItemList.css'
import Map from '../Map/Map'

export default class ItemList extends Component {
    static defaultProps = {
        match: {
          params: {}
        }
    }
    static contextType = Context
    render(){
        const {items=[]} = this.context
        return(
            <section className='ItemList'>
                <ul>
                    {items.map(item =>
                        <li key={item.id}>
                        <Item
                            {...item}
                        />
                        </li>
                    )}
                </ul>
                <div className='mapcontainer'><Map></Map></div>
            </section>
        )
    }
}

