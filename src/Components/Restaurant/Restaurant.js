import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Tabs, Tab, Card } from 'react-bootstrap'
import { firestore } from '../../firebase'

import MenuItems from './MenuItems'
import AboutUs from './AboutUs'
import Contact from './Contact'

export default function Restaurant() {
  const [restaurant, setRestaurant] = useState({menu: [{itemImgUrl: 'https://picsum.photos/200',}], address: {}})

  let query = firestore.collection("restaurants").doc("jg4VGdICBjpXDFIzj4We");

  useEffect(() => {
    try {
      query.get().then(doc => {
          setRestaurant(doc.data())
      })
    } catch(error) {
          console.log("Error getting document:", error);
      }
  }, [])

  return (
    <Container className='d-flex align-text-center justify-content-between flex-column' style={{ minHeight: "100vh"}}>
      <Navbar className='d-flex align-items-center mh-20' style={{minHeight: "20px"}}>
        <Nav>
          <Nav.Link href="/">Back</Nav.Link>
        </Nav>
      </Navbar>

      <Card className='d-flex justify-content-center' style={{height: "60vh"}}>
        <Card.Body>
        <Tabs fill defaultActiveKey='Menu' id='options-tab' style={{fontSize: '1rem', borderBottom: "1px solid black"}}>
            <Tab eventKey='Menu' title='View Menu / Order'>
              <Tab.Pane className='d-flex justify-content-center align-items-center h-100px' style={{minHeight: '50vh', maxHeight: '50vh'}}>
                <MenuItems restaurant={restaurant}/>
              </Tab.Pane>
            </Tab>
            <Tab eventKey='about' title='About Us'>
              <Tab.Pane className='d-flex justify-content-center mt-5 overflow-hidden' style={{minHeight: '50vh', maxHeight: '50vh', overflowY: 'auto'}}>
                <AboutUs restaurant={restaurant}/>
              </Tab.Pane>
            </Tab>
            <Tab eventKey='contact' title='Contact'>
              <Tab.Pane className='d-flex justify-content-center mt-5 overflow-hidden' style={{minHeight: '50vh', maxHeight: '50vh', overflowY: 'auto'}}>
              <Contact restaurant={restaurant}/>
              </Tab.Pane>
            </Tab>
            <Tab eventKey='checkout' title='Check Out'>
              <Tab.Pane className='d-flex justify-content-center mt-5 overflow-hidden' style={{minHeight: '50vh', maxHeight: '50vh', overflowY: 'auto'}}>
              </Tab.Pane>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{minHeight: "100px"}}>
        <Navbar.Brand></Navbar.Brand>
        <Nav>
          {/* <Nav.Link>Placeholder 1</Nav.Link> */}
        </Nav>
      </Navbar>

    </Container>
  )
}
