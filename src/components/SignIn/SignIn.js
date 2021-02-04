import React, { Component } from 'react'
import AuthApiService from '../../services/auth-service'
import TokenService from '../../services/token-service'
import './SignIn.css'
import Context from '../../Context'
import HTForm from '../HTForm/HTform'

export default class SignIn extends Component{
    static contextType = Context
    constructor(props){
        super(props)
        this.state={
            error: null,
            user_id: ''
        }
    }

    static defaultProps = {
        history: {
          push: () => {}
        }
    }

    handleLoginSuccess = () => {
        const { history } = this.props
        history.push(`/user/${this.state.user_id}`)
        this.context.handleLog()
        TokenService.hasAuthToken()
    }

    handleSubmitJwtAuth = e => {
        e.preventDefault()
        this.setState({ error: null })
        const { email, password } = e.target
        
        AuthApiService.postLogin({
            email: email.value,
            password: password.value,
        })
            .then(res => {
               email.value = ''
               password.value = ''
               this.setState( {user_id: res.id})
               TokenService.saveAuthToken(res.authToken)
               TokenService.saveUserId(res.id)
               TokenService.saveUserName(res.full_name)
               this.handleLoginSuccess()
            })
            .catch(res => {
               this.setState({ error: res.error })
            })
    }

    render(){
        const { error } = this.state
        return(
            <div className="SignIn">
                <HTForm className='signin-form' onSubmit={this.handleSubmitJwtAuth}>
                    <div>
                        <h4 className="HTLogo" >Harvest Table</h4>
                        <h2>Login</h2>
                    </div>
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div>
                    <label htmlFor="email">Email: </label>
                    <input placeholder='email*' type="text" name='email' 
                        id='email'  autoComplete='email' required/>
                    </div>
                    <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" name='password' id='password'
                        placeholder='password*' autoComplete='password'
                        required />
                    </div>
                    <button type='submit'>Login</button>
                </HTForm>
            </div>
        )
    }
}