import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Tabs, Tab, Card } from 'react-bootstrap'
import { firestore } from '../../firebase'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'

import MenuItems from './MenuItems'
import AboutUs from './AboutUs'
import Contact from './Contact'
import Checkout from './Checkout'

const stripePromise = loadStripe('pk_test_51ILuS0Fp1MZdStAzmZuANmYRFR8ahWoReeciJKWQnCdBppxfNJ0SJSH5TYF0Aa0rksYtzRjt8SpX98EepSPl4B5w00H8CqOYdu')

export default function Restaurant(props) {

  const [restaurant, setRestaurant] = useState({menu: [{itemImgUrl: 'https://picsum.photos/200',}], address: {}})
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  let query = firestore.collection("restaurants").doc(`${props.restaurantId}`);

  useEffect(() => {
    try {
      query.get().then(doc => {
          setRestaurant(doc.data())
      })
    } catch(error) {
          console.log("Error getting document:", error);
      }
  }, [])

  function handleAddToCart(item) {
    setCart([...cart, item])
    setTotal(total => total + item.price)
    console.log(`total is: `, total)
  }

  function handleRemoveFromCart(item) {
    let newCart = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name !== item.name) {
        newCart.push(item)
      }
    }
      console.log(newCart)
      setCart(newCart)
    setTotal(total => total - item.price)
  }


  return (
    <Container className='d-flex align-text-center justify-content-between flex-column' style={{ minHeight: "100vh"}}>
      <Navbar className='d-flex align-items-center mh-20' style={{minHeight: "20px"}}>
        <Nav variant="pills">
          <Nav.Link href="/">Back to Home</Nav.Link>
        </Nav>
      </Navbar>

        <Tabs fill defaultActiveKey='Menu' id='options-tab' style={{fontSize: '1rem', borderBottom: "1px solid #dee2e6"}}>
            <Tab eventKey='Menu' title='View Menu / Order'>
              <Tab.Pane className='d-flex justify-content-center align-items-center overflow-auto mt-5' style={{height: '75vh'}}>
                <MenuItems restaurant={restaurant} handleAddToCart={handleAddToCart}/>
              </Tab.Pane>
            </Tab>
            <Tab eventKey='about' title='About Us'>
              <Tab.Pane className='d-flex justify-content-center mt-5' style={{overflowY: 'auto', height: '75vh'}}>
                <AboutUs restaurant={restaurant}/>
              </Tab.Pane>
            </Tab>
            <Tab eventKey='contact' title='Contact'>
              <Tab.Pane className='d-flex justify-content-center mt-5' style={{overflowY: 'auto', height: '75vh'}}>
              <Contact restaurant={restaurant}/>
              </Tab.Pane>
            </Tab>
            <Tab eventKey='checkout' title='Check Out'>
              <Tab.Pane className='d-flex justify-content-center mt-5' style={{overflowY: 'auto', height: '75vh'}}>
                <Elements stripe={stripePromise}>
                  <Checkout restaurant={restaurant} cart={cart} total={total} handleRemoveFromCart={handleRemoveFromCart}/>
                </Elements>
              </Tab.Pane>
            </Tab>
          </Tabs>

      <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{borderTop: "1px solid #dee2e6"}}>
        <Navbar.Brand></Navbar.Brand>
        <Nav>
          <Nav.Link>Yelp</Nav.Link>
          <Nav.Link>Facebook</Nav.Link>
          <Nav.Link>Instagram</Nav.Link>
        </Nav>
      </Navbar>

    </Container>
  )
}
