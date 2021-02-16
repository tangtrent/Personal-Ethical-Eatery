import '../App.css';
import React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../Context/AuthContext';

import LandingPage from './LandingPage';
import SignUp from './SignIn/SignUp';
import LogIn from './SignIn/LogIn';
import Dashboard from './SignIn/Dashboard';
import PrivateRoute from './SignIn/PrivateRoute';

function App() {
  return (
    <Container className="d-flex align-center justify-content-center" style={{ minHeight: "100vh"}}>
      <div className="w-100" style={{ maxWidth: '100vh' }}>
        <Router>
        <AuthProvider>
          <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}
export default App;