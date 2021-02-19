import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Figure } from 'react-bootstrap'
import MenuItem from './MenuItem'

export default function Menu(props) {
  return(
    <>
      <button onClick={props.handleOpen}>Add Menu Item</button>
      <MenuItem menu={props.item.menu} selection={(selected) => props.selection(selected)} deletion={(deleted) => props.deletion(deleted)}/>
    </>
  )
}