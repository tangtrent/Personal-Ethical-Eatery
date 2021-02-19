import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card } from 'react-bootstrap'
import { useState, useEffect} from 'react'
import Menu from './Menu'
import Contact from './Contact'
import AboutUs from './AboutUs'
import EditMenuItemModal from './EditMenuItemModal'
import AddMenuItemModal from './AddMenuItemModal'
import ContactModal from './ContactModal'
import AboutUsModal from './AboutUsModal'
import { firestore } from '../../firebase'


function EditPage({ editId }) {
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [contactModal, setContactModal] = useState(false)
  const [aboutUsModal, setAboutUsModal] = useState(false)
  const [selectedEdit, setSelectedEdit] = useState(0)
  const [page , setPage] = useState('Menu')
  const [item, setItem] = useState({aboutUs: 'asdf', address: {city: 'asdf', state: 'asdf', streetNumber: 'asdf', zip: 'asdf'}, imgurl: '', menu: [{description: 'asdf', itemImgUrl: 'asdf', itemType: 'asdf', name: 'asdf', price: 'asdf'}], name: 'asdf', phone: 'asdf', type: ['','','']})

  let query = firestore.collection("restaurants").doc(`${editId}`);

  const showAddModal = () => { setAddModal(!addModal) }
  const showEditModal = () => { setEditModal(!editModal) }
  const showContactModal = () => {
    setContactModal(!contactModal)
    getRequest()
  }
  const showAboutUsModal = () => {
    setAboutUsModal(!aboutUsModal)
    getRequest()
  }

  const handleSelection = (selected) => {
    setSelectedEdit(selected)
    showEditModal()
  }
  const handleDeletion = (deleted) => {
    var update = item.menu.slice(0, deleted).concat(item.menu.slice(deleted + 1, item.menu.length))
    console.log(update)
    query.update({
      menu: update
    })
    .then(() => {
      getRequest()
    })
    .catch(() => {
      console.error('Update Failure')
    })
  }
  const getRequest = () => {
    query.get()
    .then((doc) => {
      if (doc.exists) {
        setItem(doc.data())
      } else {
        console.log("ReRoute");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  }
  useEffect(() => {
    query.get()
    .then((doc) => {
      if (doc.exists) {
        setItem(doc.data())
      } else {
        console.log("ReRoute");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  },[])

  const addItem = () => {
    setItem(item => {
      item.push({name: '', description: '', price: null, itemImgUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Pho-Beef-Noodles-2008.jpg'})
      return item
    })
  }

  console.log('infinite loop')
  return (
    <Container className='d-flex align-text-center justify-content-between flex-column' style={{ minHeight: "100vh"}}>
      <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{minHeight: "100px"}}>
        <Navbar.Brand onClick={() => console.log('Har Har')}>Home</Navbar.Brand>
        <Nav>
          <Nav.Link onClick={() => setPage('Menu')}>Menu</Nav.Link>
          <Nav.Link onClick={() => setPage('Contact')}>Contact</Nav.Link>
          <Nav.Link onClick={() => setPage('AboutUs')}>AboutUs</Nav.Link>
        </Nav>
      </Navbar>

      <Card className='d-flex justify-content-start' style={{height: "65vh"}}>
        {page === "Menu" && <Menu item={item} restaurantId={editId} handleOpen={showAddModal} selection={(selected) => handleSelection(selected)} deletion={(deleted) => handleDeletion(deleted)}/>}
        {page === "Contact" && <Contact item={item} handleOpen={showContactModal}/>}
        {page === "AboutUs" && <AboutUs item={item} handleOpen={showAboutUsModal}/>}
      </Card>

      <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{minHeight: "100px"}}>
        <Nav>
          <Nav.Link></Nav.Link>
          <Nav.Link></Nav.Link>
          <Nav.Link></Nav.Link>
        </Nav>
      </Navbar>
      <EditMenuItemModal item={item.menu[selectedEdit]} index={selectedEdit} menu={item.menu} show={editModal} handleClose={showEditModal} restaurantId={editId}/>
      <AddMenuItemModal show={addModal} handleClose={showAddModal} menu={item.menu} restaurantId={editId}/>
      <ContactModal show={contactModal} handleClose={showContactModal} restaurantId={editId}/>
      <AboutUsModal show={aboutUsModal} handleClose={showAboutUsModal} restaurantId={editId}/>
    </Container>
  );
}

export default EditPage;