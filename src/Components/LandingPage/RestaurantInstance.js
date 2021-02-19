import React from 'react';
import {Card, CardGroup, CardDeck} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function RestaurantInstance(props) {

  let { eachRestaurant, viewRestaurant } = props;
  let { restaurantImgUrl, name, aboutUs, restaurantType, restaurantId } = eachRestaurant;
  return (
    <Card className="w-50" style={{}}>
      <Card.Img src={`${restaurantImgUrl}`} className="w-100"></Card.Img>
      <Card.Header>{restaurantType.map(type => {return type})}</Card.Header>
      <Card.Title className="">{name}</Card.Title>
      <Card.Text className="">{aboutUs}</Card.Text>
      <Card.Footer>
        <Link to='/restaurant' onClick={() => {viewRestaurant(restaurantId)}}>View Restaurant</Link>
      </Card.Footer>
    </Card>
  )

}

