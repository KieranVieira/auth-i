import React from 'react';
import axios from 'axios';

class UserView extends React.Component{
    state={
        users: []
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/users')
            .then(res => {
                this.setState({
                    users: res.data
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    render(){
        return(
            this.state.users ? 
            this.state.users.map(user => {
                return <h1>{user.username}</h1>
            }) :
            <h1>no users to display</h1>
        )
    }
}

export default UserView;