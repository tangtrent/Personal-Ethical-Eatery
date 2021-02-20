import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Figure } from 'react-bootstrap'
import MenuItem from './MenuItem'

export default function Menu(props) {

  const style = {width: '103vh', height: '25vh', border: 'none'}
  return(
    <Card  className="" style={{border: "0px"}}>
      <Button onClick={props.handleOpen} style={style}>Add Menu Item</Button>
      <MenuItem menu={props.item.menu} selection={(selected) => props.selection(selected)} deletion={(deleted) => props.deletion(deleted)}/>
    </Card>
  )
}