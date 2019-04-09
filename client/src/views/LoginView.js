import React from 'react';
import axios from 'axios';

import LoginForm from '../components/LoginForm';

class LoginView extends React.Component{
    state={
        loginInfo: {
            username: '',
            password: ''
        }
    }

    handleLoginChange = e => {
        this.setState({
            loginInfo: {
                ...this.state.loginInfo,
                [e.target.name]: e.target.value
            }
        })
    }

    handleLogin = e => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/login', this.state.loginInfo)
            .then(res => {
                this.setState({
                    loggedIn: true,
                    loginInfo: {
                        username: '',
                        password: ''
                    }
                })
                this.props.history.push('/')
            })
            .catch(error => {
                console.log('error happened')
                console.log(error)
            })
    }

    render(){
        return(
            <LoginForm handleLoginChange={this.handleLoginChange} handleLogin={this.handleLogin}/>
        )
    }
}

export default LoginView