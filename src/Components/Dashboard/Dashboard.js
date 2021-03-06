import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Container, Navbar, Nav, Tabs, Tab, ListGroup, Jumbotron, Modal } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { firestore } from '../../firebase.js';
import DashboardRestaurants from './DashboardRestaurants';
import ModalPage from '../CreateRestaurant/ModalPage'

  const Dashboard = ({ editRestaurantId }) => {
  const [error, setError] = useState('')
  const [userInfo, setUserInfo] = useState({restaurants: [{name: 'haha'}]})
  const [restaurants, setRestaurants] = useState([]);
  const [show, setShow] = useState(false)
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  const handleShow = () => { setShow(true); getRestaurants()}
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

  const handleDelete = (selectedRes) => {
    firestore.collection('restaurants').doc(selectedRes).delete()
      .then(() => {
        getRestaurants()
      })
  }

  const getRestaurants = () => {
    firestore.collection('restaurants').where('owner', '==', currentUser.uid).get()
      .then(snapshot => {
        var temp = [];
        snapshot.forEach(doc => {
          let currObj = doc.data();
          currObj.restaurantId = doc.id;
          temp.push(currObj);
        })
        setRestaurants(temp)
      })
  }

  useEffect(() => {
    try {
      firestore.collection('users').doc(currentUser.uid).get()
        .then(doc => {
          setUserInfo(doc.data());
        })
        .then(() => {
          getRestaurants()
        })
    } catch(err) {
      console.error(err)
    }
  }, [])

  console.log(restaurants)

  return (
    <Container className='d-flex align-text-center justify-content-between flex-column' style={{ minHeight: "100vh"}}>
      <Navbar className='mh-20' style={{minHeight: "100px"}}>
        <Nav className='d-flex justify-content-end w-100' style={{fontSize: '1.25rem'}}>
          <Nav.Link href='/'>Home</Nav.Link>
          <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
        </Nav>
      </Navbar>

      <Card style={{height: '600px'}}>
        <Card.Body>

          <Jumbotron style={{minHeight: '100%'}}>
            {/* <Navbar className='d-flex justify-content-center '>
              <div className='w-100' style={{fontSize: '1.25rem'}}>
                <Nav.Link style={{float: 'left', color: 'black'}} variant="link" href='/'>Home</Nav.Link>
                <Nav.Link style={{float: 'right', color: 'black'}} variant="link" onClick={handleLogout}>Log Out</Nav.Link>
              </div>
            </Navbar> */}
            <div style={{marginTop: '100px'}}>
              <h2 className='d-flex justify-content-center'>Welcome, {userInfo.firstName}!</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <p className='mt-3 d-flex justify-content-center'>You can create a new restaurant, or edit an existing one:</p>
              <div className='d-flex justify-content-center'>
                <Button href='/ModalPage' className='m-5' variant="danger" size='lg' style={{minHeight: '100px', minWidth: '200px', maxWidth: '200px', paddingTop: '3.6%'}}>Create restaurant</Button>
                <Button className='m-5' variant="danger" size='lg' style={{minHeight: '100px', minWidth: '200px', maxWidth: '200px'}} onClick={handleShow}>Edit restaurant</Button>
              </div>
              <Modal show={show} onHide={handleClose} style={{minHeight: '500px'}}>
                <Modal.Header closeButton>
                  <Modal.Title>Select restaurant:</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{maxHeight: '700px', overflowY: 'auto'}}>
                  <DashboardRestaurants restaurants={restaurants} handleDelete={handleDelete} editRestaurantId={editRestaurantId}/>
                </Modal.Body>
              </Modal>
            </div>
          </Jumbotron>

        </Card.Body>
      </Card>

      <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{minHeight: "100px"}}>
      </Navbar>

    </Container>
  )
}

export default Dashboard;