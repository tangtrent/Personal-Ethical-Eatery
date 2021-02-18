import React from 'react';
import {Card, CardGroup} from 'react-bootstrap'
import { Link } from 'react-router-dom';

export default function RestaurantInstance(props) {

  let { eachRestaurant, viewRestaurant } = props;
  let { restaurantImgUrl, name, aboutUs, restaurantType, restaurantId } = eachRestaurant;
  console.log('this is id in restaurant instance:', restaurantId)
  return (
    <Card>
      <Card.Img src={restaurantImgUrl}></Card.Img>
      {/* <Card.Header>{restaurantType.map(type => {return type})}</Card.Header> */}
      <Card.Title>{name}</Card.Title>
      <Card.Text>{aboutUs}</Card.Text>
      <Link to='/restaurant' onClick={() => {viewRestaurant(restaurantId)}}>View Restaurant</Link>
    </Card>
  )

}

