import React from 'react'
import { Card, Image, Button } from 'react-bootstrap'

export default function MenuItemInstance({ currentMenuItem, handleAddToCart }) {
  // console.log(currentMenuItem)
  return (
    <Card className="mx-auto p-2" style={{ width: "500px"}}>
      <Image src={currentMenuItem.itemImgUrl} />
      <br/>
      {currentMenuItem.name}
      <br/>
      {currentMenuItem.description}
      <br/>
      ${currentMenuItem.price}
      <Button variant="danger" size="sm" onClick={() => handleAddToCart(currentMenuItem)}>Add to Cart</Button>
    </Card>
  )
}
