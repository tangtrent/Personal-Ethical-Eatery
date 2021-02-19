import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Figure, Modal, Badge } from 'react-bootstrap'
import { useState } from 'react'
import { firestore } from '../../firebase'

export default function AboutUsModal(props) {
  const [aboutUs, setAboutUs] = useState('')
  const [warning, setWarning] = useState(false)

  let query = firestore.collection("restaurants").doc(props.restaurantId);

  console.log(props)

  const handleAboutUs = (e) => {
    setAboutUs(e.target.value)
  }

  const handleSubmit = () => {
    if (aboutUs.length === 0) {
      setWarning(true)
    } else {
      setWarning(false)
      query.update({
        aboutUs: aboutUs
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
        <textarea className='w-100 h-100' placeholder='About Us' onChange={handleAboutUs}/>
      </Modal.Header>

      <Modal.Body>
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