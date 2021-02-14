import React, { Component } from 'react';
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css'

import RestaurantTemplate from './RestaurantTemplate';

export default class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      signedIn: true,
    }
    this.onSignInSuccess = this.onSignInSuccess.bind(this)
  }

  componentDidMount() {
    let uiConfig = {
      signInFlow: 'popup',
      signInSuccessUrl: '',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
      callbacks: {
        signInSuccessWithAuthResult: function(authResult) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return false;
        },
        updateState: () => this.setState({signedIn: true,}),
        uiShown: function() {
          document.getElementById('loader').style.display = 'none';
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.

    };

    let ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        {
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: true
        }
      ]
    });
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }

  onSignInSuccess = () => {
    this.setState({ signedIn: true })
    return false
  }

  render(){
    return (
      <div>
        <RestaurantTemplate />
      </div>
    )
  }
}