import React from 'react';
import axios from 'axios';

import RegisterForm from '../components/RegisterForm';

class RegisterView extends React.Component{
    state={
        registerInfo: {
            username: '',
            password: ''
        }
    }

    handleRegisterChange = e => {
        this.setState({
            registerInfo: {
                ...this.state.registerInfo,
                [e.target.name]: e.target.value
            }
        })
    }

    handleRegister = e => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/register', this.state.registerInfo)
            .then(res => {
                this.setState({
                    loggedIn: true,
                    registerInfo: {
                        username: '',
                        password: ''
                    }
                })
                this.props.history.push('/')
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        return(
            <RegisterForm handleRegisterChange={this.handleRegisterChange} handleRegister={this.handleRegister}/>
        )
    }
}

export default RegisterView