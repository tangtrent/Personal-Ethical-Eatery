import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../Context/AuthContext';

import LandingPage from './LandingPage';
import Restaurant from './Restaurant/Restaurant';
import SignUp from './SignIn/SignUp';
import LogIn from './SignIn/LogIn';
import Dashboard from './Dashboard/Dashboard';
import PrivateRoute from './SignIn/PrivateRoute';
import ModalPage from './CreateRestaurant/ModalPage';
import EditingPage from './EditingPage/EditPage';
import Josh from './Restaurant/Josh';

function App() {
  // const history = useHistory();
  let [editId, setEditId] = useState('random');
  let [restaurantId, setRestaurantId] = useState('initial state restaurant id');
  // console.log(restaurantId)
  const viewRestaurant = (id) => {
    // console.log('view restaurant was clicked')
    setRestaurantId(id);
    // history.push('restaurant');
  }

  const editRestaurantId = (id) => {
    setEditId(id);
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
            <Route path="/ithertz" component={Josh} />
            <PrivateRoute path="/dashboard" render={() => {return <Dashboard editRestaurantId={editRestaurantId}/>}}/>
            <PrivateRoute path='/modalpage' render={() => {return <ModalPage editRestaurantId={editRestaurantId}/>}}/>
            <PrivateRoute path='/editing' render={() => {return <EditingPage editId={editId}/>}}/>
          </Switch>
        </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}
export default App;
