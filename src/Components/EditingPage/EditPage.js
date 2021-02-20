import { Container, Row, Navbar, Nav, Form, FormControl, Button, Card, Tab, Tabs } from 'react-bootstrap'
import { useState, useEffect} from 'react'
import Menu from './Menu'
import Contact from './Contact'
import AboutUs from './AboutUs'
import EditMenuItemModal from './EditMenuItemModal'
import AddMenuItemModal from './AddMenuItemModal'
import ContactModal from './ContactModal'
import AboutUsModal from './AboutUsModal'
import { Link } from 'react-router-dom'
import { firestore } from '../../firebase'


function EditPage({ editId }) {
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [contactModal, setContactModal] = useState(false)
  const [aboutUsModal, setAboutUsModal] = useState(false)
  const [selectedEdit, setSelectedEdit] = useState(0)
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
      <Navbar className='d-flex align-items-center mh-20' style={{minHeight: "20px"}}>
        <Nav variant="pills">
          <Link to='/dashboard'>
            Back
          </Link>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>
      </Navbar>

      <Tabs fill defaultActiveKey='Menu' id='options-tab' style={{fontSize: '1rem', borderBottom: "1px solid #dee2e6"}}>
            <Tab eventKey='Menu' title='Menu'>
              <Tab.Pane className='d-flex justify-content-center overflow-auto mt-5' style={{  height: '75vh'}}>
                <Menu item={item} restaurantId={editId} handleOpen={showAddModal} selection={(selected) => handleSelection(selected)} deletion={(deleted) => handleDeletion(deleted)}/>
              </Tab.Pane>
            </Tab>
            <Tab eventKey='about' title='About Us'>
              <Tab.Pane className='d-flex justify-content-center mt-5' style={{overflowY: 'auto', height: '75vh'}}>
                <AboutUs item={item} handleOpen={showAboutUsModal}/>
              </Tab.Pane>
            </Tab>
            <Tab eventKey='contact' title='Contact'>
              <Tab.Pane className='d-flex justify-content-center mt-5' style={{overflowY: 'auto', height: '75vh'}}>
                <Contact item={item} handleOpen={showContactModal}/>
              </Tab.Pane>
            </Tab>
          </Tabs>

      <Navbar className='d-flex justify-content-center align-items-center mh-20' style={{borderTop: "1px solid #dee2e6"}}>
        <Navbar.Brand></Navbar.Brand>
        <Nav>
          <Nav.Link>Yelp</Nav.Link>
          <Nav.Link>Facebook</Nav.Link>
          <Nav.Link>Instagram</Nav.Link>
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
