import React, {Component} from 'react'
import Item from '../Item/Item'
import Context from '../../Context'
import { findItem } from '../../Helpers'
import TokenService from '../../services/token-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from'@fortawesome/free-solid-svg-icons'
import ListingsApiService from '../../services/listings-api-service'

export default class ItemPage extends Component {
    constructor(props){
        super(props)
        this.state={
            error: null
        }
    }
    static defaultProps = {
        match: {
          params: {}
        },
        history: {
            goBack: () => { }
          },
    }

    static contextType = Context

    handleItemDelete= e => {
        e.preventDefault()
        const {itemId} = this.props.match.params
        ListingsApiService.deleteListing(itemId)
        .then(res => {
          this.context.deleteItem(itemId)
          this.props.history.goBack()
        })
        .catch(res => {
            this.setState({ error: res.error })
        })
      }

    render(){
        const { items=[] } = this.context 
        const { itemId } = this.props.match.params
        const item = findItem(items, itemId) || { content: '' }
        const { error } = this.state
        return(
            <div className="ItemPage">
                <section className="regError" role='alert'>{error}</section>
                 <button className="backbtn" onClick={() => this.props.history.goBack()}>Back</button>
                 {TokenService.hasAuthToken()
                ?<button className="deletebtn" onClick={this.handleItemDelete}><FontAwesomeIcon icon={faTrash} /> Delete</button>
                : null}
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