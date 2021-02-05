import React from 'react'
import Item from '../Item/Item'
import './ItemList.css'




export default function ItemList({ items }) {
        return(
            <div className='List-Items'>
                <ul>       
                    {items.map(item =>
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

