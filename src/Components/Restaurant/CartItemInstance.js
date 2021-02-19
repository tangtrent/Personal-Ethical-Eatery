import React from 'react'
import { Card, Button } from 'react-bootstrap'

export default function CartItemInstance( { currentCartItem, handleRemoveFromCart }) {
  return (
    // <Card className="mb-1 p-2">
    //   {currentCartItem.name}
    //   <br/>
    //   {/* <Image src={"currentCartItem.itemImgUrl"} /> */}
    //   {/* <br/> */}
    //   {currentCartItem.description}
    //   <br/>
    //   ${currentCartItem.price}
    //   <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(currentCartItem)}>Remove Item</Button>
    // </Card>

<Card className="mb-2 p-2 d-flex" style={{}}>
<div className="d-flex flex-row">
  <Card.Img src={currentCartItem.itemImgUrl}  style={{ width: '20%' }}/>
  <Card.Body>
    <div className='d-flex justify-content-between p-4 align-top'style={{ backgroundColor: '#e9ecef' }}>
      <span>
        {currentCartItem.name}
      </span>
      <span>
        ${currentCartItem.price}
      </span>
    </div>
    <div className="mt-2 p-4">
      <strong>Description:<br/>{'     '}</strong>{currentCartItem.description}
    </div>
  </Card.Body>
</div>

<Button variant="danger" size="sm" className="mt-2" onClick={() => handleRemoveFromCart(currentCartItem)}>Remove Item</Button>
</Card>
  )
}
