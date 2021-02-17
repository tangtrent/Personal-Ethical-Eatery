import React from 'react'

import MenuItemInstance from './MenuItemInstance'

export default function MenuItems({ restaurant }) {
  return (
    <div>
      {restaurant.menu.map((currentMenuItem, key) => {
        return <MenuItemInstance currentMenuItem={currentMenuItem} key={key}/>
      })}
    </div>
  )
}