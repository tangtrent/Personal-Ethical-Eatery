import React, { Component, useState} from 'react';
import { Container, Navbar, Nav, Form, Button, Card, CardGroup, Modal } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { firestore } from '../firebase.js';
import RestaurantsList from './LandingPage/RestaurantsList.js'
import { useAuth } from '../Context/AuthContext';

const LandingPage = (props) => {

  let { viewRestaurant } = props;
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const { currentUser, logout } = useAuth()
  const history = useHistory()
  const [showModal, setShowModal] = useState(false);
  const [showImage, setShowImage] = useState('block');

  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.push('/')
    } catch {
      setError('Failed to log out')
    }
  }

  const submitSearch = () => {
    firestore.collection('restaurants').where('restaurantType', 'array-contains', `${search}`).get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((eachDoc) => {
          let eachRestaurantDoc = eachDoc.data();
          eachRestaurantDoc.restaurantId = eachDoc.id;
          return eachRestaurantDoc;
        });
        if (data.length === 0) {
          setShowModal(true);
        }
        setRestaurants(data);
        setShowImage('none')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Container className='d-flex align-text-center justify-content-between flex-column' style={{ minHeight: "100vh"}}>

      <Navbar className='d-flex justify-content-end' style={{minHeight: "100px"}}>
        <Nav>
          {currentUser ?
          <>
            <Nav.Link href='dashboard'>Profile</Nav.Link>
            <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
          </> :
          <>
            <Nav.Link href="LogIn">Log In</Nav.Link>
            <Nav.Link href="SignUp">Sign Up</Nav.Link>
          </>}
        </Nav>
      </Navbar>

      <Card style={{height: "65vh", border: "0px solid"}}>
        <img src="https://firebasestorage.googleapis.com/v0/b/ethical-eater.appspot.com/o/EERacoon2.jpg?alt=media&token=0fca548a-de84-47c0-96e2-e2d0eb93f590" style={{zIndex: "", height: "auto", width: "50%", border: "", margin: "auto", display: `${showImage}`, animation: "fadeIn ease 20s", transition: "all 10s linear"}}></img>
        {/* <h1 className="text-center">WELCOME TO ETHICAL EATERY!</h1> */}
        <Card.Body className='d-flex justify-content-center'>
          <Form onSubmit={(event) => {event.preventDefault(); submitSearch()}}>
            {/* <div>{''}</div> */}
            <div className="mb-4" style={{border: "", width: "100%"}}>
              <h2>Where Are We Eating Today?</h2>
            </div>
              <Form.Group controlId="formRestaurantSearch" className="d-flex">
                <Form.Control type="text" placeholder="Search Restaurants..." className="mr-sm-2" onChange={(event) => {setSearch(event.target.value)}}/>
                <Button className="btn-danger" onClick={submitSearch}>Search</Button>
              </Form.Group>
          </Form>
        </Card.Body>
        <Modal show={showModal} onHide={() => setShowModal(false)} size='sm' centered>
          <Modal.Header>
            <Modal.Title>No Results Found</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please Try Again</Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setShowModal(false)} className="btn-danger">Close</Button>
          </Modal.Footer>
        </Modal>
        <RestaurantsList restaurants={restaurants} viewRestaurant={viewRestaurant} />
      </Card>

      <Navbar className='d-flex justify-content-center align-items-center' style={{minHeight: "100px"}}>
        <Nav >
          <Nav.Link>About Us</Nav.Link>
        </Nav>
      </Navbar>

    </Container>
  )
}

export default LandingPage;
