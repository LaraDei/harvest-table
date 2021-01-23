import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Item.css'
import Context from '../../Context'


export default class Item extends Component{
    static contextType = Context
    
    render(props){
        return(
            <div className="item">
                <img  src={this.props.img_location} alt={this.props.name} width="100" height="100"/>
                <div className='item-details'>
                    <p className="item-title">
                        <Link to={`/item/${this.props.id}`}>
                            {this.props.name}
                        </Link>
                    </p>
                    <p>{this.props.location}</p>
                    <p className='mod-date'>
                            Posted {' '}{this.props.date_modified}
                    </p>
                </div>
            </div>
        )
    }
}

