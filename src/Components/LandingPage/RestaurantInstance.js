import React from 'react';
import {Card, CardGroup} from 'react-bootstrap'

export default function Restaurant(props) {
  let { eachRestaurant } = props;
  let { restaurantImgUrl, name, aboutUs, restaurantType } = eachRestaurant;
  return (
    <Card>
      <Card.Img src={restaurantImgUrl}></Card.Img>
      {/* <Card.Header>{restaurantType.map(type => {return type})}</Card.Header> */}
      <Card.Title>{name}</Card.Title>
      <Card.Text>{aboutUs}</Card.Text>
    </Card>
  )

}
