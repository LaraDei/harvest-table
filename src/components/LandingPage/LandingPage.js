import React, {Component} from 'react'
import './LandingPage.css'

export default class LandingPage extends Component{
    render(){
        return(
            <div className='LandingPage'>
                 <header className='app-header'>
                    <h1>Harvest Table</h1> 
                </header>
                <section>
                    <header>
                        <h3>Find Free Local Produce</h3>
                    </header>
                    <p>Support your community by saying no to waste. List your surplus produce on Harvest Table and support your neighbors or local food banks.</p>
                </section>
               
           </div>
        )
    }
}