import React from 'react'
import { Card } from 'react-bootstrap'

export default function Contact({ restaurant }) {
  return (
    <Card className="mx-auto text-center" style={{ width: "400px", border: "0px" }}>
      <span>
      <strong>{restaurant.name}</strong>
      <br/>
      </span>
      <span>
      {restaurant.imgurl}
      <br/>
      </span>
      <span>
      <strong>Address: </strong>{restaurant.address.streetNumber}
      </span>
      <span>
      {restaurant.address.city},{' '}
      {restaurant.address.state},{' '}
      {restaurant.address.zip}
      <br/>
      </span>
      <span>
      <strong>Phone: </strong>{restaurant.phone}
      <br/>
      </span>
      <span>
      <strong>Email: </strong>{restaurant.email}
      </span>
    </Card>
  )
}
