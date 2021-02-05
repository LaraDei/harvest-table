import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from '../../img/Untitled.png'
import './LandingPage.css'

export default class LandingPage extends Component{
    render(){
        return(
            <div className='LandingPage'>
                 <header className='app-header'>
                    <h1 className="HTLogo" ><img src={logo} alt="lemon logo"/>Harvest Table</h1> 
                </header>
               
                <div className="Landing-children">
                <section>
                    <header>
                        <h3>Find Free Local Produce</h3>
                    </header>
                    <p>Support your community by saying no to waste. List your surplus produce on Harvest Table and support your neighbors or local food banks.</p>
                </section>
                <section>
                    <header>
                        <h3>Find Food Banks</h3>
                    </header>
                    <p>You may also give your surplus produce to your local food bank. Search for local food banks at {" "}
                    <Link to="https://www.feedingamerica.org/find-your-local-foodbank"  target="_blank">Feeding America</Link>. Please make sure to contact
                    your foodbank first, since not all locations can accept homegrown produce.</p>
                </section>
                <section>
                    <header>
                        <h3>How to use this site</h3>
                    </header>
                    <p>You can find local produce by going to 'Find Produce' in the navigation bar. You can look by location or item title. When posting your own produce, 
                        please include instructions that explain how someone can make a pick up. For example you can let them know they need to harvest it themselves, or that it is
                        located in a basket by your garage. If you want to schedule pick ups, please include a way to contact you, either a phone number or email.</p>
                </section>
                </div>
           </div>
        )
    }
}