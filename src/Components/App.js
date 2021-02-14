import '../App.css';
import React, { Component } from 'react';

import LandingPage from './LandingPage.js';
import LogIn from './LogIn/LogIn.js';
// import RestaurantTemplate from './RestaurantTemplate.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      signedIn: true,
      selectedRestaurant: '',
      render: 'landingPage'
    }
    this.onSignInSuccess = this.onSignInSuccess.bind(this)
    this.handleLogInClick = this.handleLogInClick.bind(this)
  }

  handleLoInClick(e) {
    e.preventDefault()
    this.setState({
      render: 'LogIn'
    })
  }

  render(){
    if (this.state.render === 'landingPage') {
      return (
        <div>
          <LandingPage />
        </div>
      )
    }
    else {
      return (
        <div className="App">
          <h1>Welcome to the Ethical Eatery</h1>
          <div id="firebaseui-auth-container"></div>
          <div id="loader">Loading...</div>
        </div>
      );
    }
  }
}

export default App;
