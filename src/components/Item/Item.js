import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Item.css'
import Context from '../../Context'
import { format, formatDistanceToNow } from "date-fns";


export default class Item extends Component{
    static contextType = Context
    
    render(props){
        let date = this.props.date_modified
        let newDate = Date.parse(date)
        let dateFormated = format(newDate, 'E MM/dd/yyyy')
        let fromNow = formatDistanceToNow(newDate)
        return(
            <div className="item">
                <img  src={this.props.img_location} alt={this.props.name} width="100" height="100"/>
                <div className='item-details'>
                    <div className="item-first-line">
                        <p className="item-title">
                            <Link to={`/item/${this.props.id}`}>
                                {this.props.name}
                            </Link>
                        </p>
                        <p className='mod-date'>
                            {dateFormated}
                        </p>
                    </div>
                    <p>{this.props.location}</p>
                    <p className='ago-date'>
                        Posted:{' '}{fromNow}{' '}ago
                    </p>
                </div>
            </div>
        )
    }
}

