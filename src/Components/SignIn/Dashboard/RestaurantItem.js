import React from 'react';
import { Card, Button, Alert, Container, Navbar, Nav, Tabs, Tab, ListGroup } from 'react-bootstrap';


export default function RestaurantItem(props) {
  return (
    <>
      <ListGroup style={{maxHeight: '75px', maxWidth: '100%', minHeight: '50vh', minWidth: '100%', fontSize: '3rem'}}>
        <ListGroup.Item>
          {props.restaurant.name}
          <div style={{display: 'inline', float: 'right'}}>
            <Button style={{fontSize: '1.25rem', marginRight: '4px'}}>Edit</Button>
            <Button variant='danger' style={{fontSize: '1.25rem', minHeight: '5px'}}>Delete</Button>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          {props.restaurant.name}
          <div style={{display: 'inline', float: 'right'}}>
            <Button style={{fontSize: '1.25rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
            <Button variant='danger' style={{fontSize: '1.25rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          {props.restaurant.name}
          <div style={{display: 'inline', float: 'right'}}>
            <Button style={{fontSize: '1.25rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
            <Button variant='danger' style={{fontSize: '1.25rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          {props.restaurant.name}
          <div style={{display: 'inline', float: 'right'}}>
            <Button style={{fontSize: '1.25rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
            <Button variant='danger' style={{fontSize: '1.25rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          {props.restaurant.name}
          <div style={{display: 'inline', float: 'right'}}>
            <Button style={{fontSize: '1.25rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
            <Button variant='danger' style={{fontSize: '1.25rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          {props.restaurant.name}
          <div style={{display: 'inline', float: 'right'}}>
            <Button style={{fontSize: '1.25rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
            <Button variant='danger' style={{fontSize: '1.25rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          {props.restaurant.name}
          <div style={{display: 'inline', float: 'right'}}>
            <Button style={{fontSize: '1.25rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
            <Button variant='danger' style={{fontSize: '1.25rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
          </div>
        </ListGroup.Item>
        <ListGroup.Item>
          {props.restaurant.name}
          <div style={{display: 'inline', float: 'right'}}>
            <Button style={{fontSize: '1.25rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
            <Button variant='danger' style={{fontSize: '1.25rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </>
  )
}
