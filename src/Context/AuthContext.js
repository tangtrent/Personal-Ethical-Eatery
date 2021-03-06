import React, { useContext, useState, useEffect } from 'react';
import { auth, firestore } from '../firebase.js'

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password, firstName, lastName) {
    return auth.createUserWithEmailAndPassword(email, password).then(cred => {
        firestore.collection('users').doc(cred.user.uid).set({
          email: email,
          firstName: firstName,
          lastName: lastName,
          restaurants: []
        })
      })
      .catch(err => { console.log(err); })
    }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged (user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
