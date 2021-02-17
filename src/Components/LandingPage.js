import React, { Component, useState} from 'react';
import { Container, Navbar, Nav, Form, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { firestore } from '../firebase.js';

const LandingPage = () => {

  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState([{name: 'hello there'}]);

  const submitSearch = () => {
    firestore.collection('restaurants').where('name', '==', `${search}`).get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((eachDoc) => eachDoc.data());
        // console.log(data)
        setRestaurants(data);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Container className='d-flex align-text-center justify-content-between flex-column' style={{ minHeight: "100vh"}}>

      <Navbar className='d-flex justify-content-end' style={{minHeight: "100px"}}>
        <Nav>
          {/* <Link to="LogIn">Log In |</Link>
          <Link to="SignUp">| Sign Up</Link> */}
          <Nav.Link href="LogIn">Log In</Nav.Link>
          <Nav.Link href="SignUp">Sign Up</Nav.Link>
        </Nav>
      </Navbar>

      <Card style={{height: "65vh", border: "0px"}}>
        <Card.Body className='d-flex justify-content-center'>
          <Form >
            <h1>Where are we eating today?</h1>
            <Form.Group controlId="formRestaurantSearch" className="d-flex">
              <Form.Control type="text" placeholder="Search Restaurants..." className="mr-sm-2" onChange={(event) => {setSearch(event.target.value)}}/>
              <Button variant="outline-info" onClick={submitSearch}>Search</Button>
            </Form.Group>
          </Form>
        </Card.Body>
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


// export default class LandingPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       query: '',
//     }
//   }

//   render() {
//     return (
//       <Container className='d-flex align-text-center justify-content-between flex-column' style={{ minHeight: "100vh"}}>
//       <Navbar className='d-flex justify-content-end' style={{minHeight: "100px"}}>
//         <Nav>
//           {/* <Link to="LogIn">Log In |</Link>
//           <Link to="SignUp">| Sign Up</Link> */}
//           <Nav.Link href="LogIn">Log In</Nav.Link>
//           <Nav.Link href="SignUp">Sign Up</Nav.Link>
//         </Nav>
//       </Navbar>

//       <Card style={{height: "65vh", border: "0px"}}>
//         <Card.Body className='d-flex justify-content-center'>
//           <Form >
//             <h1>Where are we eating today?</h1>
//             <Form.Group controlId="formRestaurantSearch" className="d-flex">
//               <Form.Control type="text" placeholder="Search Restaurants..." className="mr-sm-2"/>
//               <Button variant="outline-info">Search</Button>
//             </Form.Group>
//           </Form>
//         </Card.Body>
//       </Card>

//       <Navbar className='d-flex justify-content-center align-items-center' style={{minHeight: "100px"}}>
//         <Nav >
//           <Nav.Link>About Us</Nav.Link>
//         </Nav>
//       </Navbar>

//     </Container>
//     )
//   }
// }