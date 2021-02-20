import React from 'react';
import {Card, CardGroup, CardDeck, Button} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';

export default function RestaurantInstance(props) {

  let { eachRestaurant, viewRestaurant } = props;
  let { restaurantImgUrl, name, aboutUs, restaurantType, restaurantId } = eachRestaurant;
  return (

    <Card className="mb-2 p-2 d-flex" style={{}}>
    <div className="d-flex flex-row">
      <div className="d-flex align-items-center">
        <Card.Img src={restaurantImgUrl}  style={{ width: '400px', objectFit: 'contain' }}/>
      </div>
      <Card.Body className='d-flex flex-column justify-content-between' style={{}}>
        <div className='d-flex justify-content-between p-4'style={{ backgroundColor: '#e9ecef', marginTop: '0%' }}>
          <span>
            {name}
          </span>
          <span>
            <Link to='/restaurant' onClick={() => {viewRestaurant(restaurantId)}}>View Restaurant</Link>
          </span>
        </div>
        <div className="mt-2 p-4" style={{border: '0'}}>
          <strong>Description:<br/>{'     '}</strong>{aboutUs}
        </div>
        <div className='d-flex justify-content-end'>
          {/* <Button href='/restaurant' variant="danger" size="sm" className="mt-2 w-25" onClick={() => {viewRestaurant(restaurantId)}}>View Restaurant</Button> */}
      </div>
      </Card.Body>
    </div>

  </Card>
  )

}

