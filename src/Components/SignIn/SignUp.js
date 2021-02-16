import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card, Alert, Container, Navbar } from 'react-bootstrap';
import { useAuth } from '../../Context/AuthContext'

const SignUp = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError(`Error, the passwords don't match!`)
    }

    try {
      setError(``)
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value, firstNameRef.current.value, lastNameRef.current.value)
      history.push('dashboard')
    } catch {
      setError('Failed to create an account')
    }
    setLoading(false)
    // signup(emailRef.current.value, passwordRef.current.value)
  }

  return (
    <Container className='d-flex align-text-center justify-content-between flex-column' style={{ minHeight: "100vh", maxWidth: "600px" }}>
    {/* <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{minHeight: "100px", border: "0px"}}>
      <Navbar.Brand></Navbar.Brand>
    </Navbar> */}
    <Card className='d-flex justify-content-center' style={{ height: "65vh", border: "0px", maxWidth: '100vh' }}>
      <Card.Body>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="name" ref={firstNameRef} required/>
            </Form.Group>
            <Form.Group id="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="name" ref={lastNameRef} required/>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required/>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required/>
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required/>
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an Account? <Link to="LogIn">Log In</Link>
      </div>
      </Card.Body>
      </Card>
      <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{minHeight: "100px", border: "0px"}}>
        <Navbar.Brand></Navbar.Brand>
      </Navbar>
    </Container>
  );
};
export default SignUp;