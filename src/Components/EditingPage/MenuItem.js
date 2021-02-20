import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Figure } from 'react-bootstrap'

export default function MenuItem(props) {
  return(
    props.menu.map((item, index) => {

        return (
          <Card className="mb-2 p-2 d-flex" style={{}}>
            <div className="d-flex flex-row">
              <img src={item.itemImgUrl}  style={{ width: '50vh', objectFit: 'contain' }}/>
              <Card.Body className='d-flex flex-column justify-content-between align-top'>
                <div className='d-flex justify-content-between p-4 align-top' style={{ backgroundColor: '#e9ecef' }}>
                  <span>{item.name}</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span>${item.price}</span>
                </div>
                <div className="mt-2 p-4">
                  <strong>Description:<br/>{'     '}</strong>{item.description}
                </div>
                <div className='d-flex justify-content-end'>
                  <Button variant="primary" size="sm" className="mt-2 w-25" onClick={() => props.selection(index)}>Edit</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="danger" size="sm" className="mt-2 w-25" onClick={() => props.deletion(index)}>Delete</Button>
              </div>
              </Card.Body>
            </div>
          </Card>
        )

    })
  )
}
