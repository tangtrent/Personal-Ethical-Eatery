import React from 'react'
import {Card, CardGroup} from 'react-bootstrap'
import RestaurantInstance from './RestaurantInstance.js'

export default function RestaurantsList(props) {

  let { restaurants, viewRestaurant } = props;

  return (
    <CardGroup>
      {restaurants.map((eachRestaurant) => {
        return <RestaurantInstance eachRestaurant={eachRestaurant} viewRestaurant={viewRestaurant}/>
      })}
    </CardGroup>
  )
}
