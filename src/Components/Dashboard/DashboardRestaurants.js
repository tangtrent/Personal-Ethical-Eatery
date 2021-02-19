import React from 'react';
import RestaurantItem from './RestaurantItem';

export default function DashboardRestaurants(props) {
  if (!props) {
    return null;
  } else if (props.restaurants.length === 0) {
    return (
      <div>Create a restaurant first!</div>
    )
  } else {
    return (
      <>
        {props.restaurants.map((restaurant, id) => {
          return <RestaurantItem style={{min: '700px', overflowY: 'auto'}} key={id} restaurant={restaurant} handleDelete={props.handleDelete}/>
        })}
      </>
    )
  }
}