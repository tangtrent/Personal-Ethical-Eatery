import React from 'react'
import { Card, Image } from 'react-bootstrap'

export default function MenuItemInstance({ currentMenuItem }) {
  console.log(`img url is`, currentMenuItem.itemImgUrl)
  return (
    <Card className="mx-auto mt-2 p-2" style={{ width: "500px"}}>
      {currentMenuItem.name}
      <br/>
      {/* <Image src={"currentMenuItem.itemImgUrl"} /> */}
      {/* <br/> */}
      {currentMenuItem.description}
      <br/>
      ${currentMenuItem.price}
    </Card>
  )
}
