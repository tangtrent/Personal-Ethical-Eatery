import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Figure, Image } from 'react-bootstrap'

export default function AboutUs(props) {
  return(
    // <Figure className='d-flex align-content-center justify-content-center'>
    //   <Figure.Image src="https://www.pngjoy.com/pngl/229/4451366_meme-man-harold-thumbs-up-png-download.png" style={{height: '600px', width: '400px'}}/>
    // </Figure>
    <Card className='h-100'>
      <Card.Header style={{fontSize: '2rem'}}>About Us</Card.Header>
      <Card.Body>{props.item.aboutUs}</Card.Body>
      <Card.Title onClick={props.handleOpen} style={{position: "absolute", right: 0, top: '50%', paddingRight: "10px", cursor: "pointer"}}>Edit</Card.Title>
    </Card>
  )
}