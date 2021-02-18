import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Container, Navbar, Nav, Tabs, Tab, ListGroup, Jumbotron, Modal } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext';
import { firestore } from '../../../firebase.js';
import DashboardRestaurants from './DashboardRestaurants';

export default function Dashboard() {
  const [error, setError] = useState('')
  const [userInfo, setUserInfo] = useState({restaurants: [{name: 'haha'}]})
  const [show, setShow] = useState(false)
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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
    try {
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
      .then((doc) => {
        console.log(doc.data())
      })
    } catch(err) {
      console.error(err);
    }
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

  console.log(userInfo)

  return (
    <Container className='d-flex align-text-center justify-content-between flex-column' style={{ minHeight: "100vh"}}>
      <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{minHeight: "100px"}}>
      </Navbar>

      <Card style={{height: '65vh'}}>
        <Card.Body>
          {/* <h2 className="text-left mb-4">Welcome, {userInfo.firstName}!</h2>
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
          </Tabs> */}
          <Jumbotron style={{minHeight: '100%'}}>
            <Navbar className='d-flex justify-content-center '>
              <div className='w-100' style={{fontSize: '1.25rem'}}>
                <Nav.Link style={{float: 'left', color: 'black'}} variant="link" href='/'>Home</Nav.Link>
                <Nav.Link style={{float: 'right', color: 'black'}} variant="link" onClick={handleLogout}>Log Out</Nav.Link>
              </div>
            </Navbar>
            <h2 className='d-flex justify-content-center'>Welcome, {userInfo.firstName}!</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <p className='mt-3 d-flex justify-content-center'>You can create a new restaurant, or edit an existing one:</p>
            <div className='d-flex justify-content-center'>
              <Button className='m-5' variant="danger" size='lg' style={{minHeight: '70px', minWidth: '200px', maxWidth: '200px'}} onClick={onCreate}>Create restaurant</Button>
              <Button className='m-5' variant="danger" size='lg' style={{minHeight: '100px', minWidth: '200px', maxWidth: '200px'}} onClick={handleShow}>Edit restaurant</Button>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Click edit or delete:</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{maxHeight: '100vh', overflowY: 'auto'}}>
                <DashboardRestaurants userInfo={userInfo} />
              </Modal.Body>
            </Modal>
          </Jumbotron>
        </Card.Body>
      </Card>

      <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{minHeight: "100px"}}>
      </Navbar>

    </Container>
  )
}
