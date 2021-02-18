import React from 'react';
import RestaurantItem from './RestaurantItem';

export default function DashboardRestaurants(props) {
  const restaurants = props.restaurants;
  console.log(props)
  if (!props) {
    return null;
  } else if (props.userInfo.restaurants.length === 0) {
    return (
      <div>Create a restaurant first!</div>
    )
  } else {
    return (
      <>
        {props.userInfo.restaurants.map(restaurant => {
          return <RestaurantItem restaurant={restaurant} />
        })}
      </>
    )
  }
}