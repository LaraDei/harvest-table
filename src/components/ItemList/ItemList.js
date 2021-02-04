import React, {Component} from 'react'
import Item from '../Item/Item'
import Context from '../../Context'
import Pagination from '../Pagination/Pagination'
import './ItemList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faSearch, faTimesCircle} from'@fortawesome/free-solid-svg-icons'


export default function ItemList({ items, loading }) {
// console.log(items)
        return(
            <div className='List-Items'>
                <ul>
                    {loading
                    ? <p>loading...</p>
                    : items.map(item =>
                         <li key={item.id}>
                            <Item
                                {...item}
                            />
                        </li>
                    )}
                </ul>
            </div>
        )
}

