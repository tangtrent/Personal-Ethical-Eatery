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

const menuItemOne = {description: "Pizza covered in pepperoni", itemImgUrl: "https://picsum.photos/200", itemType: "entree", name: "Peperoni Pizza", price: 300}

const menuItemTwo = {description: "Canadian bacon and Pinneapple", itemImgUrl: "https://picsum.photos/200", itemType: "entree", name: "Hawaiian Pizza", price: 200}


export default function Restaurant() {
  const [restaurant, setRestaurant] = useState({menu: [{itemImgUrl: 'https://picsum.photos/200',}], address: {}})
  const [cart, setCart] = useState([])
  // const [cartObj, setCartObj] = useState({})
  const [total, setTotal] = useState(0)


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

  function handleAddToCart(item) {
    console.log('handleAddToCart ran')
    setCart([...cart, item])
    // setCartObj(cartObj => cartObj[item.name] = item)
    setTotal(total => total + item.price)
  }

  function handleRemoveFromCart(item) {
    console.log('handleRemoveFromCart ran')
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
        <Nav>
          <Nav.Link href="/">Back</Nav.Link>
        </Nav>
      </Navbar>

      <Card className='d-flex justify-content-center overflow-auto' style={{height: "60vh"}}>
        <Card.Body>
        <Tabs fill defaultActiveKey='Menu' id='options-tab' style={{fontSize: '1rem', borderBottom: "1px solid black"}}>
            <Tab eventKey='Menu' title='View Menu / Order'>
              <Tab.Pane className='d-flex justify-content-center align-items-center h-100px' style={{minHeight: '50vh', maxHeight: '50vh'}}>
                <MenuItems restaurant={restaurant} handleAddToCart={handleAddToCart}/>
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
                <Elements stripe={stripePromise}>
                  <Checkout restaurant={restaurant} cart={cart} total={total} handleRemoveFromCart={handleRemoveFromCart}/>
                </Elements>
              </Tab.Pane>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      <Navbar className='d-flex justify-content-center align-items-center mh-20' >
        <Navbar.Brand></Navbar.Brand>
        <Nav>
        </Nav>
      </Navbar>

    </Container>
  )
}
