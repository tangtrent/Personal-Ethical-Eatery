import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Figure, Modal, Badge } from 'react-bootstrap'
import { useState } from 'react'
import { firestore } from '../../firebase'


export default function AddMenuItem(props) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [itemType, setItemType] = useState('')
  const [itemImgUrl, setItemImgUrl] = useState('')
  const [warning, setWarning] = useState(false)

  let query = firestore.collection("restaurants").doc("jg4VGdICBjpXDFIzj4We");

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handlePrice = (e) => {
    setPrice(e.target.value)
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
  }
  const handleItemType = (e) => {
    setItemType(e.target.value)
  }
  const handleItemImgUrl = (e) => {
    setItemImgUrl(e.target.value)
  }

  const handleAdd = () => {
    if (name.length === 0 || price.length === 0 || description.length === 0 || itemType === 0 || itemImgUrl === 0) {
      setWarning(true)
    } else {
      setWarning(false)
      props.menu.push({ name, price, description, itemType, itemImgUrl })
      query.update({
        menu: props.menu
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
        <input placeholder='Name' onChange={handleName}/>
        <input placeholder='Price' type='number' onChange={handlePrice}/>
      </Modal.Header>

      <Modal.Body>
        <input placeholder='Image Link' onChange={handleItemImgUrl}/>
        <input placeholder='Item Type' onChange={handleItemType}/>
        <textarea className='w-100 h-100' placeholder='Description' onChange={handleDescription}/>
        {warning && <Badge variant='secondary'>Missing Fields</Badge>}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setWarning(false)
          props.handleClose()
        }}>Cancel</Button>
        <Button variant="primary" onClick={handleAdd}>Add New Menu Item</Button>
      </Modal.Footer>
    </Modal>
  )
}