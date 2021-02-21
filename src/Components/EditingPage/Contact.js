import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Figure } from 'react-bootstrap'

export default function Contact(props) {
  return(
    <Card className="mx-auto text-center" style={{ width: "400px", border: "0px" }}>
      <span><strong>Email: </strong>{props.item.email}</span>
      <span><strong>Phone: </strong>{props.item.phone}</span>
      <span><strong>Address: </strong>{props.item.address.streetNumber}</span>
      {props.item.address.city},{' '}
      {props.item.address.state},{' '}
      {props.item.address.zip}
      <Button variant="primary" size="sm" className="mt-5" onClick={props.handleOpen}>Edit</Button>
    </Card>
  )
}
