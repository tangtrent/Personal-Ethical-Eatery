import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Figure, Modal, Badge } from 'react-bootstrap'
import { useState } from 'react'
import { firestore } from '../../firebase'

export default function EditMenuItem(props) {
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

  const handleSubmit = () => {
    if (name.length === 0 || price.length === 0 || description.length === 0 || itemType === 0 || itemImgUrl === 0) {
      setWarning(true)
    } else {
      setWarning(false)
      props.menu[props.index] = { name, price, description, itemType, itemImgUrl }
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
  const handleDelete = () => {
    var update = props.menu.slice(0, props.index).concat(props.menu.slice(props.index + 1, props.menu.length))
    console.log(update)
    query.update({
      menu: update
    })
    .then(() => {
      props.handleClose()
    })
    .catch(() => {
      console.error('Update Failure')
    })
  }

  return(
    <Modal show={props.show} onHide={() => {
      setWarning(false)
      props.handleClose()
    }}>
      <Modal.Header closeButton>
        <input placeholder={props.item.name} onChange={handleName}/>
        <input placeholder={props.item.price} type='number' onChange={handlePrice}/>
      </Modal.Header>

      <Modal.Body>
        <input placeholder={props.item.itemImgUrl} onChange={handleItemImgUrl}/>
        <input placeholder={props.item.itemType} onChange={handleItemType}/>
        <textarea className='w-100 h-100' placeholder={props.item.description} onChange={handleDescription}/>
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