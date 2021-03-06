import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from "react-router-dom";

import { Container, Modal, Form, InputGroup, Col, Button, Row, ListGroup, ProgressBar } from 'react-bootstrap';
import { useAuth } from '../../Context/AuthContext';
import { firestore, storage } from '../../firebase.js';

export default function ModalPage({ editRestaurantId }) {
  const { currentUser } = useAuth();
  const [userInfo, setUserInfo] = useState()
  const [showFirst, setShowFirst] = useState(false)
  const [showNext, setShowNext] = useState(false);
  const [currentType, setCurrentType] = useState('')
  const [foodTypes, setFoodTypes] = useState([])
  const [name, setName] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0)
  const history = useHistory();

  const handleShow = () => { setShowFirst(true); setShowNext(false)}
  const handleNext = () => {
    setShowFirst(false);
    setShowNext(true);
  }

  const handleChange = (e) => {
    switch(e.target.title) {
      case 'Name':
        setName(e.target.value);
        break;
      case 'StreetNumber':
        setStreetNumber(e.target.value);
        break;
      case 'City':
        setCity(e.target.value);
        break;
      case 'State':
        setState(e.target.value);
        break;
      case 'Zip':
        setZip(e.target.value);
        break;
      case 'Phone':
        setPhone(e.target.value);
        break;
      case 'Email':
        setEmail(e.target.value);
        break;
      case 'About':
        setAbout(e.target.value);
        break;
    }
  }

  const handleAdd = () => {
    if (currentType !== '') {
      if (foodTypes.indexOf(currentType) !== -1) {
        alert('already exists')
      } else {
        setFoodTypes([...foodTypes, currentType]);
        setCurrentType('');
      }
    }
  }

  const handleDelete = (e, type) => {
    e.preventDefault();
    console.log(type)

    let pos = foodTypes.indexOf(type);
    if (pos < foodTypes.length - 1) {
      console.log(pos)
      console.log(type)
      let newArray = foodTypes;
      console.log(newArray);
      console.log(foodTypes)
      console.log(newArray.splice(pos, 1))
    } else {
      setFoodTypes(foodTypes.splice(0, pos))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    firestore.collection('restaurants').add({
      name: name,
      aboutUs: about,
      address: {streetNumber: streetNumber,
                state: state,
                city: city,
                zip: zip},
      menu: [],
      phone: phone,
      email: email,
      restaurantType: foodTypes,
      restaurantImgUrl: selectedFile,
      owner: currentUser.uid,
    })
    .then(doc => {
      editRestaurantId(doc.id);
      history.push('editing')
    })
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
          setSelectedFile(url);
        })
      })
  }

  useEffect(() => {
    try {
      setShowFirst(true);
      firestore.collection('users').doc(currentUser.uid).get()
        .then(doc => {
          setUserInfo(doc.data());
        })
    } catch(err) {
      console.error(err)
    }
  }, [])
  console.log(selectedFile)
  return (
    <>
      <Modal centered show={showFirst} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Tell us about your restaurant</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group className='mt-3'>
            <Col sm='11'>
              <Form.Label className='mt-2'>Restaurant Name</Form.Label>
              <Form.Control title='Name' placeholder='Name' onChange={handleChange} value={name}></Form.Control>
              <Form.Label className='mt-2'>Address</Form.Label>
              <Form.Control className='mt-2' title='StreetNumber' placeholder='1234 W. Main St.' onChange={handleChange} value={streetNumber}></Form.Control>
              <Form.Row className='mt-2'>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control className='mt-2' title='City' onChange={handleChange} value={city}></Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control className='mt-2' title='State' onChange={handleChange} value={state}></Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control className='mt-2' title='Zip' onChange={handleChange} value={zip}></Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Label>Phone</Form.Label>
              <Form.Control title='Phone' placeholder='(###) ### ####' onChange={handleChange} value={phone}></Form.Control>
              <Form.Label className='mt-2'>Email</Form.Label>
              <Form.Control type='email' title='Email' placeholder='Enter email' onChange={handleChange} value={email}></Form.Control>
            </Col>
            <div className='d-flex justify-content-center mt-5'>
              <Button href='/dashboard' className='mr-3' variant='danger' size='lg'> Back </Button>
              <Button variant='danger' size='lg' onClick={handleNext}> Next </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal>


      <Modal centered show={showNext} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Tell us more</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group className='mt-3'>
            <Col sm='11'>
              <Form.Label className='mt-2'>Your story</Form.Label>
              <Form.Control as='textarea' title='About' placeholder='We are a family based...' onChange={handleChange} value={about}></Form.Control>
              <Form.Row className='ml-3'>
                <Form.Group as={Row} controlId="formGridCity">
                  <Form.Label className='mt-2'>What kind of food?</Form.Label>
                  <Form.Control className='mt-2' type='text' placeholder='sushi, tacos, burgers' value={currentType} onChange={(e) => setCurrentType(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className='mt-5 ml-4' as={Row} controlId="formGridCity">
                  <Button onClick={handleAdd}>Add</Button>
                </Form.Group>
                <ListGroup>
                  {foodTypes.map(type => {
                    return (
                      <>
                        <ListGroup.Item style={{padding: '.75rem 1.25rem .75rem .3rem', display: 'inline', minWidth: '150px'}}>
                          <button style={{border: 'none', backgroundColor: 'white', paddingRight: '15px'}} onClick={(e) => handleDelete(e, type)}>X</button>
                          <strong>{type}</strong>
                        </ListGroup.Item>
                      </>
                    )
                  })}
                </ListGroup>
              </Form.Row>
              <Form.Group className='mt-3' onSubmit={() => handleFile()}>
                <Form.Label>Add a main page image</Form.Label>
                <Form.File.Input onChange={handleFile}></Form.File.Input>
                <ProgressBar now={progress} className='mt-2'/>
              </Form.Group>
            </Col>
            <div className='d-flex justify-content-center mt-5'>
              <Button className='mr-3' variant='danger' size='lg' onClick={handleShow}> Back </Button>
              <Button variant='danger' size='lg' onClick={handleSubmit}> Done </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal>
    </>
  )
}
