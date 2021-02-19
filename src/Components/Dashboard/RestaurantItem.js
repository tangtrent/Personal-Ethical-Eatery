import React from 'react';
import { Card, Button, Alert, Container, Navbar, Nav, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function RestaurantItem({ restaurant, handleDelete, editRestaurantId }) {
  return (
    <>
      <ListGroup className='mt-3' style={{maxHeight: '75px', maxWidth: '100%', minHeight: '10vh', minWidth: '100%', fontSize: '3rem'}}>
        <ListGroup.Item>
          {restaurant.name}
          <div style={{display: 'inline', float: 'right'}}>
            <Link to='/editing'><Button style={{fontSize: '1.25rem', marginRight: '4px' }} onClick={() => {editRestaurantId(restaurant.restaurantId)}}>Edit</Button></Link>
            <Button variant='danger' style={{fontSize: '1.25rem', minHeight: '5px'}} onClick={() => handleDelete(restaurant.restaurantId)}>Delete</Button>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}
