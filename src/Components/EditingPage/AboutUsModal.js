import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Figure, Modal, Badge, ProgressBar } from 'react-bootstrap'
import { useState } from 'react'
import { firestore, storage } from '../../firebase'

export default function AboutUsModal(props) {
  const [aboutUs, setAboutUs] = useState('')
  const [restaurantImgUrl, setRestaurantImgUrl] = useState('')
  const [progress, setProgress] = useState(0)
  const [warning, setWarning] = useState(false)

  let query = firestore.collection("restaurants").doc(props.restaurantId);

  console.log(props)

  const handleAboutUs = (e) => {
    setAboutUs(e.target.value)
  }

  const handleSubmit = () => {
    if (aboutUs.length === 0 || restaurantImgUrl.length === 0) {
      setWarning(true)
    } else {
      setWarning(false)
      query.update({
        aboutUs: aboutUs,
        restaurantImgUrl: restaurantImgUrl
      })
      .then(() => {
        props.handleClose()
        setProgress(0)
        setAboutUs('')
        setRestaurantImgUrl('')
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
          setRestaurantImgUrl(url);
        })
      })

  }

  return(
    <Modal show={props.show} onHide={() => {
      setWarning(false)
      props.handleClose()
      setProgress(0)
      setAboutUs('')
      setRestaurantImgUrl('')
    }}>
      <Modal.Header closeButton>
        <textarea className='w-100 h-100' placeholder='About Us' onChange={handleAboutUs}/>
      </Modal.Header>

      <Modal.Body>
      <Form.Group className='mt-3' onSubmit={() => handleFile()}>
            <Form.Label>Upload Image</Form.Label>
            <Form.File.Input onChange={handleFile}></Form.File.Input>
            <ProgressBar now={progress} className='mt-2'/>
          </Form.Group>
        {warning && <Badge variant='secondary'>Missing Fields</Badge>}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setWarning(false)
          props.handleClose()
          setProgress(0)
          setAboutUs('')
          setRestaurantImgUrl('')
        }}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Save changes</Button>
      </Modal.Footer>
    </Modal>
  )
}