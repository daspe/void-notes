// Main Navigation Bar component
import React from 'react';
import { 
  Nav,
  Navbar,
} from 'react-bootstrap';
import LoadNbForm from './LoadNbForm';
import NavBarNbInfo from './NavBarNbInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function NavigationBar({ nbLoaded, nb, unloadNotes, onChange, onSubmit }) {
  let loadNb;
  if (!nbLoaded) {
    loadNb = <LoadNbForm onChange={onChange} onSubmit={onSubmit} />;
  } else {
    loadNb = <NavBarNbInfo nb={nb} unloadNotes={unloadNotes} />;
  }

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Navbar.Brand href="/">
        <FontAwesomeIcon icon={['far', 'sticky-note']} />
        {' '}Void-Notes
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        {loadNb}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;