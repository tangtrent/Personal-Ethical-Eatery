import React from 'react'
import { Card } from 'react-bootstrap'

export default function AboutUs({ restaurant }) {
  return (
    <Card className="mx-auto" style={{ width: "500px", border: "0px" }}>
      {restaurant.aboutUs}
    </Card>
  )
}
