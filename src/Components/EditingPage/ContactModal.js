import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Figure, Modal, Badge } from 'react-bootstrap'
import { useState } from 'react'
import { firestore } from '../../firebase'

export default function ContactModal(props) {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [stait, setStait] = useState('')
  const [zip, setZip] = useState('')
  const [warning, setWarning] = useState(false)

  let query = firestore.collection("restaurants").doc(props.restaurantId);

  console.log(props)

  const handleStreet = (e) => {
    setStreet(e.target.value)
  }
  const handleCity = (e) => {
    setCity(e.target.value)
  }
  const handleStait = (e) => {
    setStait(e.target.value)
  }
  const handleZip = (e) => {
    setZip(e.target.value)
  }
  const handleEmail = (e) => {
    setEmail(e.target.value)
  }
  const handlePhone =(e) => {
    setPhone(e.target.value)
  }

  const handleSubmit = () => {
    if (street.length === 0 || city.length === 0 || stait.length === 0 || zip.length === 0 || email.length === 0 || phone.length === 0) {
      setWarning(true)
    } else {
      setWarning(false)
      var newAddress = {streetNumber: street, city: city, state: stait, zip: zip}
      query.update({
        address: newAddress,
        email: email,
        phone: phone
      })
      .then(() => {
        props.handleClose()
        setStreet('')
        setCity('')
        setStait('')
        setZip('')
        setEmail('')
        setPhone('')
      })
      .catch(() => {
        console.error('Update Failure')
      })
    }
  }

  return(
    <Modal show={props.show} onHide={() => {
      setWarning(false)
      props.handleClose()
      setStreet('')
      setCity('')
      setStait('')
      setZip('')
      setEmail('')
      setPhone('')
    }}>
      <Modal.Header closeButton>
        <input placeholder='Email' onChange={handleEmail}/>
        <input placeholder='Phone' onChange={handlePhone}/>
      </Modal.Header>

      <Modal.Body>
        <textarea className='w-100 h-100' placeholder='Street' onChange={handleStreet}/>
        <input placeholder='City' onChange={handleCity}/>
        <input placeholder='State' onChange={handleStait}/>
        <input placeholder='Zip' onChange={handleZip}/>
        {warning && <Badge variant='secondary'>Missing Fields</Badge>}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setWarning(false)
          props.handleClose()
          setStreet('')
          setCity('')
          setStait('')
          setZip('')
          setEmail('')
          setPhone('')
        }}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}