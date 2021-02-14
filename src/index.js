import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyB9n98NjbvVOpG4iWtYx6RFSwvdmKa8Xc4",
  authDomain: "ethical-eater.firebaseapp.com",
  projectId: "ethical-eater",
  storageBucket: "ethical-eater.appspot.com",
  messagingSenderId: "1019884864903",
  appId: "1:1019884864903:web:098499a4dd3c2d9fe2ff22",
  measurementId: "G-GWHK1SW149"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
