import React, {Component} from 'react'
import Context from '../../Context'


export default class AddItem extends Component{
    constructor(props){
        super(props)
        this.state={
            formTouched: false,   
        }
    }
   static contextType = Context

   fileUpload = e => {
    this.setState({
        selectedFile: e.target.files[0]
    })
}
    render(){

        return(
            <div className='AddItem'>
                <h2>Create a new Listing</h2>
                <p>*required</p>
                <section className="regError" role='alert'>

                </section>
                <form className='add-item-form'>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' placeholder='Kale' required></input>
                    </div>
                    <div>
                        <label id="imgLabel" htmlFor='image'>Image</label>
                        <input type='file' name='image' id='image' onChange={(e) => this.fileUpload(e)} required></input>
                    </div>
                    <div>
                        <label htmlFor='street-number'>Street number</label>
                        <input type='text' name='street-number' placeholder='123' required></input>
                    </div>
                    <div>
                        <label htmlFor='route'>Street</label>
                        <input type='text' name='route' placeholder='Main St.' required></input>
                    </div>
                    <div>
                        <label htmlFor='city'>city</label>
                        <input type='text' name='city' placeholder='Sacramento' required></input>
                    </div>
                    <div>
                        <label htmlFor='state'>State</label>
                        <input type='text' name='state' placeholder='CA' required></input>
                    </div>
                    <div>
                        <label htmlFor='zipcode'>Zipcode</label>
                        <input type='text' name='zipcode' placeholder='94523' required></input>
                    </div>
                </form>
            </div>
        )
    }
}