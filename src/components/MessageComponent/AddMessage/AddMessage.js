import React from 'react'

export default class SendMessageForm extends React.Component {
    constructor() {
        super()
        this.state = {
            message: ''
        }
    }
    handleChange = e =>{
        this.setState({
            message: e.target.value
        })
    }
    
    handleSubmit= e => {
        e.preventDefault()
        console.log(this.state.message)
        /** send off the message */
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="send-message-form">
                <input
                    onChange={this.handleChange}
                    value={this.state.message}
                    placeholder="Type your message and hit ENTER"
                    type="text" />
            </form>
        )
    }
}
