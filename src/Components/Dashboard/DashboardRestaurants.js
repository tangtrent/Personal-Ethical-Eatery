import React from 'react';
import RestaurantItem from './RestaurantItem';

export default function DashboardRestaurants({ restaurants, handleDelete, editRestaurantId }) {
  if (!restaurants) {
    return null;
  } else if (restaurants.length === 0) {
    return (
      <div>Create a restaurant first!</div>
    )
  } else {
    return (
      <>
        {restaurants.map((restaurant, id) => {
          return <RestaurantItem style={{min: '700px', overflowY: 'auto'}} key={restaurant.restaurantId} restaurant={restaurant} handleDelete={handleDelete} editRestaurantId={editRestaurantId}/>
        })}
      </>
    )
  }
}