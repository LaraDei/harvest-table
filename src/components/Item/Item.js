import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Item.css'
import Context from '../../Context'
import { format, formatDistanceToNow } from "date-fns";


export default class Item extends Component{
    static contextType = Context
    
    render(props){
        const date = this.props.date_modified || new Date().toUTCString()
        const newDate = Date.parse(date)
        const dateFormated = format(newDate, 'E MM/dd/yyyy')
        const fromNow = formatDistanceToNow(newDate)
        
        return(
            <div className="item">
                <img  src={this.props.img_location} alt={this.props.title} width="100" height="100"/>
                <div className='item-details'>
                    <div className="item-first-line">
                        <p className="item-title">
                            <Link to={`/item/${this.props.id}`}>
                                {this.props.title}
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

