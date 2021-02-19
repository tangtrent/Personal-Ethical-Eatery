import React from 'react'
import CartItemInstance from './CartItemInstance'
import { Card } from 'react-bootstrap'

export default function Cart( { cart, handleRemoveFromCart } ) {
  return (
    <Card style={{ border: '0px' }}>
    {cart.map((currentCartItem, key) => {
      return <CartItemInstance currentCartItem={currentCartItem} handleRemoveFromCart={handleRemoveFromCart} key={key}/>
    })}
  </Card>
  )
}
