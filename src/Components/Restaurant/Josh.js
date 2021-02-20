import React from 'react'
import { Card } from 'react-bootstrap'

export default function Josh() {
  return (
    <Card className="d-flex justify-content-center" style={{ backgroundColor: 'black' }}>
      <Card.Title className="text-center display-3">WE MISS YOU ALREADY!!</Card.Title>
      <img className="d-flex justify-content-center" style={{ height: 'auto', width: '80%', margin: 'auto'}} src="https://firebasestorage.googleapis.com/v0/b/ethical-eater.appspot.com/o/The%20Hertz.jpg?alt=media&token=15890b7d-9dd1-4b6f-a7d0-13c65d2c1b98"></img>
      <img style={{ position: 'absolute', top: '45%', height: 'auto', width: '100%', margin: 'auto', zIndex: '10'}} src="https://i.pinimg.com/originals/8b/1e/39/8b1e399a17c8b1fb8cce1658d349aaf6.png"></img>
    </Card>
  )
}

