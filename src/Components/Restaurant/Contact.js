import React from 'react'
import { Card } from 'react-bootstrap'

export default function Contact({ restaurant }) {
  return (
    <Card className="mx-auto mt-2 p-2 text-center" style={{ width: "400px", border: "0px" }}>
      {restaurant.name}
      <br/>
      {restaurant.imgurl}
      <br/>
      {restaurant.address.streetNumber}
      <br/>
      {restaurant.address.city}
      <br/>
      {restaurant.address.state},
      <br/>
      {restaurant.address.zip}
    </Card>
  )
}
