import React from 'react'
import { Card, Image, Button } from 'react-bootstrap'

export default function MenuItemInstance({ currentMenuItem, handleAddToCart }) {
  return (
    <Card className="mb-2 p-2 d-flex" style={{}}>
      <div className="d-flex flex-row">
        <img src={currentMenuItem.itemImgUrl}  style={{ width: '50vh', objectFit: 'contain' }}/>
        <Card.Body className='d-flex flex-column justify-content-between align-top'>
          <div className='d-flex justify-content-between p-4 align-top' style={{ backgroundColor: '#e9ecef' }}>
            <span>
              {currentMenuItem.name}
            </span>
            <span>
              ${currentMenuItem.price}
            </span>
          </div>
          <div className="mt-2 p-4">
            <strong>Description:<br/>{'     '}</strong>{currentMenuItem.description}
          </div>
          <div className='d-flex justify-content-end'>
            <Button variant="danger" size="sm" className="mt-2 w-25" onClick={() => handleAddToCart(currentMenuItem)}>Add to Cart</Button>
        </div>
        </Card.Body>
      </div>
    </Card>
  )
}
