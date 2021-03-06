import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import RegisterView from './views/RegisterView';
import LoginView from './views/LoginView';
import UserView from './views/UserView';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/register' component={RegisterView}/> 
        <Route path='/login' component={LoginView}/> 
        <Route path='/' exact component={UserView}/> 
      </div>
    );
  }
}

export default App;
