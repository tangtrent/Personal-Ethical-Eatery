import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card, Alert, Container, Navbar } from 'react-bootstrap';
import { useAuth } from '../../Context/AuthContext';

const LogIn = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError(``)
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push('dashboard')
    } catch {
      setError(`Failed to sign in`)
    }
    setLoading(false)
  }

  return (
    <Container className='d-flex align-text-center justify-content-between flex-column' style={{ minHeight: "100vh", maxWidth: "600px" }}>
      <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{minHeight: "100px", border: "0px"}}>
        <Navbar.Brand></Navbar.Brand>
      </Navbar>
      <Card className='d-flex justify-content-center' style={{ height: "65vh", border: "0px" }}>
        <Card.Body>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required/>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">Log In</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </Card.Body>
      </Card>
      <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{minHeight: "100px", border: "0px"}}>
        <Navbar.Brand></Navbar.Brand>
      </Navbar>
    </Container>
  );
};
export default LogIn;






