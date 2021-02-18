import '../App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, Nav } from 'react-bootstrap';
import { AuthProvider } from '../Context/AuthContext';

import LandingPage from './LandingPage';
import Restaurant from './Restaurant/Restaurant';
import SignUp from './SignIn/SignUp';
import LogIn from './SignIn/LogIn';
import Dashboard from './SignIn/Dashboard/Dashboard';
import PrivateRoute from './SignIn/PrivateRoute';

function App() {

  let [restaurantId, setRestaurantId] = useState('initial state restaurant id');
  // console.log(restaurantId)
  const viewRestaurant = (id) => {
    setRestaurantId(id);
  }

  return (
    <Container className="d-flex align-center justify-content-center" style={{ minHeight: "100vh"}}>
      <div className="w-100">
        <Router>
        <AuthProvider>
          <Switch>
            <Route exact path='/' render={() => {return <LandingPage viewRestaurant={viewRestaurant}/>}}/>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={LogIn} />
            <Route path="/restaurant" render={() => {return <Restaurant restaurantId={restaurantId}/>}} />
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}
export default App;