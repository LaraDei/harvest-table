import React from 'react'
import AuthApiService from '../../services/auth-service'
import './SignUp.css'


export default class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state={
            full_name: {
                value: '',
                touched: false
            },
            email: {
                value: '',
                touched: false
            },
            password: {
                value: '',
                touched: false
            },
            error: null,
        }
    }

    static defaultProps = {
        history: {
          push: () => {}
        }
    }

    updateValue= (value, key) => {
        this.setState({ emailError: null })
        this.setState({ [key]: {value: value, touched: true}})
    }


    handleRegistrationSuccess = user => {
        const { history } = this.props
        history.push('/login')
    }

    handleSubmit = e => {
        e.preventDefault()
        const { full_name, email, password } = e.target
        this.setState({ error: null })
        AuthApiService.postUser({
          email: email.value,
          password: password.value,
          full_name: full_name.value
        })
        .then(user => {
        full_name.value = ''
        email.value = ''
        password.value = ''
        this.handleRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
    }

    render(){
        const { error } = this.state
        return(
            <div className='Register'>
                <header>
                    <h3>Create an Account</h3>
                </header>
                <form className='register-form' onSubmit={this.handleSubmit}>
                    <div role='alert'>
                        {error && <p className='red'>{error}</p>}
                    </div>
                    <div>
                        <label htmlFor="full_name">Full name: </label>
                        <input placeholder='Full Name*' type="text" name='full_name' id='fullName' 
                            onChange={e => this.updateValue(e.target.value, e.target.id)}required />
                    </div>
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input type="text" name='email' id='email' placeholder='email*' autoComplete='email'
                            onChange={e => this.updateValue(e.target.value, e.target.id)} required/>
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        
                        <input type="password" name='password' id='password' placeholder='password*' 
                               autoComplete='new-password'
                               onChange={e => this.updateValue(e.target.value, e.target.id)}
                               minLength="8" maxLength = "25"
                               required/>
                        <p>*password must be 8-25 characters and contain at least one capital letter and one number.</p>
                    </div>
                        <button type='submit'>Register</button>
                </form>
            </div>
        )
    }
}