import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function CartItemInstance( { currentCartItem, handleRemoveFromCart }) {
  console.log(currentCartItem)
  return (
    <Card>
      {currentCartItem.name}
      <br/>
      {/* <Image src={"currentCartItem.itemImgUrl"} /> */}
      {/* <br/> */}
      {currentCartItem.description}
      <br/>
      ${currentCartItem.price}
      <button variant="danger" size="sm" onClick={() => handleRemoveFromCart(currentCartItem)}>Remove Item</button>
    </Card>
  )
}
