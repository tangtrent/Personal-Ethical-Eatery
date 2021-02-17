import React from 'react'
import { Card } from 'react-bootstrap'

export default function AboutUs({ restaurant }) {
  return (
    <Card className="mx-auto mt-2 p-2" style={{ width: "500px", border: "0px" }}>
      {restaurant.aboutUs}
    </Card>
  )
}
