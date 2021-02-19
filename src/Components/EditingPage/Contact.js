import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Figure } from 'react-bootstrap'

export default function Contact(props) {
  return(
    <Card className='h-100'>
      <Card.Header className='align-text-center' style={{fontSize: '2rem'}}>Contact Info</Card.Header>
      <Card.Text>
        <h3>Address:</h3>
        <p>{props.item.address.streetNumber}</p>
        <p>{props.item.address.city}</p>
        <p>{props.item.address.state}</p>
        <p>{props.item.address.zip}</p>
      </Card.Text>
      <Card.Title onClick={props.handleOpen} style={{position: "absolute", right: 0, top: '50%', paddingRight: "10px", cursor: "pointer"}}>Edit</Card.Title>
    </Card>
  )
}