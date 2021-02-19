import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Figure, Modal, Badge } from 'react-bootstrap'
import { useState } from 'react'
import { firestore } from '../../firebase'

export default function ContactModal(props) {
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

  const handleSubmit = () => {
    if (street.length === 0 || city.length === 0 || stait.length === 0 || zip.length === 0) {
      setWarning(true)
    } else {
      setWarning(false)
      var newAddress = {streetNumber: street, city: city, state: stait, zip: zip}
      query.update({
        address: newAddress
      })
      .then(() => {
        props.handleClose()
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
    }}>
      <Modal.Header closeButton>
        <textarea className='w-100 h-100' placeholder='Street' onChange={handleStreet}/>
      </Modal.Header>

      <Modal.Body>
        <input placeholder='City' onChange={handleCity}/>
        <input placeholder='State' onChange={handleStait}/>
        <input placeholder='Zip' onChange={handleZip}/>
        {warning && <Badge variant='secondary'>Missing Fields</Badge>}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setWarning(false)
          props.handleClose()
        }}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}