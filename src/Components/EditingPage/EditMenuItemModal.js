import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Figure, Modal, Badge, ProgressBar } from 'react-bootstrap'
import { useState } from 'react'
import { firestore, storage } from '../../firebase'

export default function EditMenuItem(props) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [itemType, setItemType] = useState('')
  const [itemImgUrl, setItemImgUrl] = useState('')
  const [progress, setProgress] = useState(0)
  const [warning, setWarning] = useState(false)

  let query = firestore.collection("restaurants").doc(props.restaurantId);

  console.log(props)

  const handleName = (e) => {
    setName(e.target.value)
  }
  const handlePrice = (e) => {
    setPrice(Number(e.target.value))
  }
  const handleDescription = (e) => {
    setDescription(e.target.value)
  }
  const handleItemType = (e) => {
    setItemType(e.target.value)
  }
  // const handleItemImgUrl = (e) => {
  //   setItemImgUrl(e.target.value)
  // }

  const handleSubmit = () => {
    if (name.length === 0 || price === null || description.length === 0 || itemImgUrl.length === 0) {
      setWarning(true)
    } else {
      setWarning(false)
      props.menu[props.index] = { name, price, description, itemImgUrl }
      query.update({
        menu: props.menu
      })
      .then(() => {
        props.handleClose()
        setName('')
        setProgress(0)
        setDescription('')
        setItemImgUrl('')
        setProgress(0)
      })
      .catch(() => {
        console.error('Update Failure')
      })
    }
  }

  const handleFile = (e) => {
    const file = e.target.files[0];
    const metadata = {
      contentType: file.type
    };
    storage.ref().child(file.name).put(file, metadata)
      .on('state_changed' , (snapshot => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }), (err) => {
        console.error(err)
      }, () => {
        storage.ref().child(file.name).getDownloadURL()
        .then(url => {
          console.log(url)
          setItemImgUrl(url);
        })
      })

  }


  return(
    <Modal size='lg' show={props.show} onHide={() => {
      setWarning(false)
      props.handleClose()
    }}>
      <Modal.Header closeButton>
        {warning && <Badge variant='secondary'>Missing Fields</Badge>}
      </Modal.Header>

      <Modal.Body className='d-flex'>
        <div className='w-50'>
          <Form.Group className='mt-3' onSubmit={() => handleFile()}>
            <Form.Label>Upload Image</Form.Label>
            <Form.File.Input onChange={handleFile}></Form.File.Input>
            <ProgressBar now={progress} className='mt-2'/>
          </Form.Group>
        </div>
        <div className='d-flex flex-column'>
          <div>
            <input placeholder='name' onChange={handleName}/>
            <input placeholder='price' type='number' onChange={handlePrice}/>
          </div>
          <textarea className='w-100 h-100' placeholder='Description' onChange={handleDescription}/>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setWarning(false)
          props.handleClose()
          setItemImgUrl('')
          setProgress(0)
        }}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}