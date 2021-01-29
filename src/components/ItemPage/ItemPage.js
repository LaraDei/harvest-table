import React, {Component} from 'react'
import Item from '../Item/Item'
import Context from '../../Context'
import { findItem } from '../../Helpers'

export default class ItemPage extends Component {
    static defaultProps = {
        match: {
          params: {}
        },
        history: {
            goBack: () => { }
          },
    }

    static contextType = Context

    render(){
        const { items=[] } = this.context 
        const { itemId } = this.props.match.params
        const item = findItem(items, itemId) || { content: '' }
        
        return(
            <div className="ItemPage">
                 <button className="backbtn" onClick={() => this.props.history.goBack()}>Back</button>
                <Item
                    key={item.id}
                    {...item}
                />
                <div className='ItemPage-content'>
                   Description:{' '} {item.description}
                </div>
            </div>
        )
    }
}