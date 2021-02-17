import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyB9n98NjbvVOpG4iWtYx6RFSwvdmKa8Xc4',
  authDomain: 'ethical-eater.firebaseapp.com',
  projectId: 'ethical-eater',
  storageBucket: 'ethical-eater.appspot.com',
  messagingSenderId: '1019884864903',
  appId: '1:1019884864903:web:098499a4dd3c2d9fe2ff22',
  measurementId: 'G-GWHK1SW149'
};

const provider = new firebase.auth.GoogleAuthProvider();

firebase.initializeApp(firebaseConfig);
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};
export const auth = firebase.auth();

export const firestore = firebase.firestore();