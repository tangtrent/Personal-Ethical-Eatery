import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Container, Navbar, Nav, Tabs, Tab, ListGroup, Jumbotron, Modal } from 'react-bootstrap';

export default function ModalPage() {
  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    setShow(true);
  }, [])

  return (
    <Modal show={show}>
      <Modal.Header closeButton></Modal.Header>
    </Modal>
  )
}
