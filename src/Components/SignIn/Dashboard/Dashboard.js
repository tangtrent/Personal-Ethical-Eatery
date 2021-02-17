import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Container, Navbar, Nav, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import { firestore } from '../../../firebase.js';
import DashboardRestaurants from './DashboardRestaurants';

export default function Dashboard() {
  const [error, setError] = useState('')
  const [userInfo, setUserInfo] = useState({restaurants: [{name: 'haha'}]})
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.push('/')
    } catch {
      setError('Failed to log out')
    }
  }

  function onCreate() {
    firestore.collection('restaurants').add({
      name: '',
      address: {streetNumber: '',
                state: '',
                city: '',
                zip: ''},
      menu: [],
      phone: '',
      email: '',
      restaurauntType: '',
      restaurantImgUrl: '',
      owner: currentUser.uid,

    })
  }

  useEffect(() => {
    try {
      firestore.collection('users').doc(currentUser.uid).get()
        .then(doc => {
          setUserInfo(doc.data());
        })
    } catch(err) {
      console.error(err)
    }
  }, [])

  return (
    <Container className='d-flex align-text-center justify-content-between flex-column' style={{ minHeight: "100vh"}}>
      <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{minHeight: "100px"}}>
        <div className='w-100' style={{fontSize: '1.65rem'}}>
          <Nav.Link style={{float: 'left'}} variant="link" href='/'>Home</Nav.Link>
          <Nav.Link style={{float: 'right'}} variant="link" onClick={handleLogout}>Log Out</Nav.Link>
        </div>
      </Navbar>

      <Card style={{height: '65vh'}}>
        <Card.Body>
          <h2 className="text-left mb-4">Welcome, {userInfo.firstName}!</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Tabs fill defaultActiveKey='create' id='options-tab' style={{fontSize: '2rem', borderBottom: '1px solid #6c757d'}}>
            <Tab eventKey='create' title='Add a restaurant'>
              <Tab.Pane className='d-flex justify-content-center align-items-center h-300px' style={{minHeight: '50vh', maxHeight: '50vh'}}>
                <Button variant="danger" size='lg' style={{minHeight: '50%', minWidth: '50%', fontSize: '3rem'}} onClick={onCreate()}>Create Restaurant</Button>
              </Tab.Pane>
            </Tab>
            <Tab eventKey='edit' title='Edit a restaurant'>
              <Tab.Pane className='d-flex justify-content-center mt-5' style={{minHeight: '44.5vh', maxHeight: '44.5vh', overflowY: 'auto'}}>
                <DashboardRestaurants userInfo={userInfo} />
              </Tab.Pane>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{minHeight: "100px"}}>
      </Navbar>

    </Container>
  )
}
