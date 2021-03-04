import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAATxZKEYqfKS7uFCEV08wxUlktTvbsvyw",
  authDomain: "personal-ethical-eater.firebaseapp.com",
  projectId: "personal-ethical-eater",
  storageBucket: "personal-ethical-eater.appspot.com",
  messagingSenderId: "272327897616",
  appId: "1:272327897616:web:829bd098f389df56805095"
};

const provider = new firebase.auth.GoogleAuthProvider();

firebase.initializeApp(firebaseConfig);
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};
export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();