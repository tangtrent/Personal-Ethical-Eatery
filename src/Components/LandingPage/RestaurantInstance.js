import React from 'react';
import {Card, CardGroup, CardDeck} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function RestaurantInstance(props) {

  let { eachRestaurant, viewRestaurant } = props;
  let { restaurantImgUrl, name, aboutUs, restaurantType, restaurantId } = eachRestaurant;
  return (
      <Card className="w-100" style={{maxHeight: "75vh"}}>
        <Card.Img src={`${restaurantImgUrl}`} className="h-75"></Card.Img>
        {/* <Card.Header>{restaurantType.map(type => {return type})}</Card.Header> */}
        <Card.Title className="h-15">{name}</Card.Title>
        <Card.Text className="h-10">{aboutUs}</Card.Text>
        <Card.Footer>
          <Link to='/restaurant' onClick={() => {viewRestaurant(restaurantId)}}>View Restaurant</Link>
        </Card.Footer>
      </Card>
  )

}

