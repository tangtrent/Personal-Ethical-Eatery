import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Figure } from 'react-bootstrap'

export default function MenuItem(props) {
  return(
    props.menu.map((item, index) => {
      return(
        <Card key={index} className='d-flex flex-row align-items-start p-3 m-1'>
          <Figure >
            <Figure.Image
              width={150}
              height={150}
              alt="171x180"
              src={item.itemImgUrl}
            />
          </Figure>
          <Card.Header className='w-25 h-75'>
            <Card.Title>{item.name}</Card.Title>
            <Card.Subtitle>${item.price}</Card.Subtitle>
          </Card.Header>
          <Card.Body className='w-75 h-75'>
            {item.description}
          </Card.Body>
          <Card.Title onClick={() => props.selection(index)} style={{cursor: "pointer"}}>Edit</Card.Title>
          <Card.Title onClick={() => props.deletion(index)} style={{position: "absolute", right: 0, bottom: 0, paddingRight: "10px", cursor: "pointer"}}>Delete</Card.Title>
        </Card>
      )
    })
  )
}