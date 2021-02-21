import React from 'react'
import {Card, CardGroup} from 'react-bootstrap'
import RestaurantInstance from './RestaurantInstance.js'

export default function RestaurantsList(props) {

  let { restaurants, viewRestaurant } = props;

  return (
    <div className="d-flex flex-column align-items-center overflow-auto h-75 mt-5">
      {restaurants.map((eachRestaurant) => {
        return <RestaurantInstance eachRestaurant={eachRestaurant} viewRestaurant={viewRestaurant}/>
      })}
    </div>
  )
}
