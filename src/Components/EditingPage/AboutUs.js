import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Figure, Image } from 'react-bootstrap'

export default function AboutUs(props) {
  return(
    <Card className="mx-auto" style={{ width: "500px", border: "0px" }}>
      <img src={props.item.restaurantImgUrl}></img>
      {props.item.aboutUs}
      <Button variant="primary" size="sm" className="mt-5" onClick={props.handleOpen}>Edit</Button>
    </Card>
  )
}
