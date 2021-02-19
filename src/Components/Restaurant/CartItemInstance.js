import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function CartItemInstance( { currentCartItem, handleRemoveFromCart }) {
  console.log(currentCartItem)
  return (
    <Card className="mb-1 p-2">
      {currentCartItem.name}
      <br/>
      {/* <Image src={"currentCartItem.itemImgUrl"} /> */}
      {/* <br/> */}
      {currentCartItem.description}
      <br/>
      ${currentCartItem.price}
      <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(currentCartItem)}>Remove Item</Button>
    </Card>
  )
}
