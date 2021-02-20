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
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // const onTypeSearch = () => {
  //   firestore.collection('restaurants').where('searchTerms', 'array-contains', `${search}`).get()
  //     .then((querySnapshot) => {
  //       const data = querySnapshot.docs.map((eachDoc) => {
  //         let eachRestaurantDoc = eachDoc.data();
  //         eachRestaurantDoc.restaurantId = eachDoc.id;
  //         return eachRestaurantDoc;
  //       });
  //       console.log(data)
  //       setRestaurants(data);
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  return (
    <Container className='d-flex align-text-center justify-content-between flex-column' style={{ minHeight: "100vh"}}>

      <Navbar className='d-flex justify-content-end' style={{minHeight: "100px"}}>
        <Nav>
          {/* <Link to="LogIn">Log In |</Link>
          <Link to="SignUp">| Sign Up</Link> */}
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
        <Card.Body className='d-flex justify-content-center '>
          <Form onSubmit={(event) => {event.preventDefault(); submitSearch()}}>
            <h1>Where are we eating today?</h1>
            <Form.Group controlId="formRestaurantSearch" className="d-flex">
              <Form.Control type="text" placeholder="Search Restaurants..." className="mr-sm-2" onChange={(event) => {setSearch(event.target.value)}}/>
              <Button className="btn-danger" onClick={submitSearch}>Search</Button>
            </Form.Group>
          </Form>
        </Card.Body>
        <Modal show={showModal} onHide={() => setShowModal(false)} size='sm' centered>
          <Modal.Header closeButton>
            <Modal.Title>Invalid Search</Modal.Title>
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
