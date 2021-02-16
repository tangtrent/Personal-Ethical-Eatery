import React, { useState } from 'react';
import { Card, Button, Alert, Container, Navbar, Nav, Tabs, Tab, ListGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import LandingPage from '../LandingPage'

export default function Dashboard() {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.push('/')
    } catch {
      setError('Failed to log out')
    }
  }

  return (
    <Container className='d-flex align-text-center justify-content-between flex-column' style={{ minHeight: "100vh"}}>
      <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{minHeight: "100px"}}>
        <div className='w-100' style={{fontSize: '1.65rem'}}>
          <Nav.Link style={{float: 'left'}} variant="link" href='/'>Home</Nav.Link>
          <Nav.Link style={{float: 'right'}} variant="link" onClick={handleLogout}>Log Out</Nav.Link>
        </div>
      </Navbar>

      <Card style={{height: '65vh'}}>
        <Card.Body>
        <h2 className="text-left mb-4">Welcome, {currentUser.email}!</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Tabs fill defaultActiveKey='create' id='options-tab' style={{fontSize: '2rem'}}>
          <Tab eventKey='create' title='Add a restaurant'>
            <Tab.Pane className='d-flex justify-content-center align-items-center h-300px' style={{minHeight: '50vh', maxHeight: '50vh'}}>
              <Button variant="danger" size='lg' style={{minHeight: '50%', minWidth: '50%', fontSize: '3rem'}}>Create Restaurant</Button>
            </Tab.Pane>
          </Tab>
          <Tab eventKey='edit' title='Edit a restaurant'>
            <Tab.Pane className='d-flex justify-content-center mt-5' style={{minHeight: '50vh', maxHeight: '50vh', overflowY: 'auto'}}>
                <ListGroup style={{maxHeight: '75px', maxWidth: '100%', minHeight: '50vh', minWidth: '100%', fontSize: '3rem'}}>
                  <ListGroup.Item>
                    Restaurant 1
                    <div style={{display: 'inline', float: 'right'}}>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
                      <Button variant='danger' style={{fontSize: '1.5rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Restaurant 2
                    <div style={{display: 'inline', float: 'right'}}>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Restaurant 3
                    <div style={{display: 'inline', float: 'right'}}>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Restaurant 1
                    <div style={{display: 'inline', float: 'right'}}>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Restaurant 2
                    <div style={{display: 'inline', float: 'right'}}>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Restaurant 3
                    <div style={{display: 'inline', float: 'right'}}>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Restaurant 1
                    <div style={{display: 'inline', float: 'right'}}>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Restaurant 1
                    <div style={{display: 'inline', float: 'right'}}>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
                    </div>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Restaurant 1
                    <div style={{display: 'inline', float: 'right'}}>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', marginRight: '4px'}}>Edit</Button>
                      <Button style={{fontSize: '1.5rem', minWidth: '10%', minHeight: '5px'}}>Delete</Button>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Tab.Pane>
          </Tab>
        </Tabs>
        </Card.Body>
      </Card>

      <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{minHeight: "100px"}}>
      </Navbar>

    </Container>
  )
}
