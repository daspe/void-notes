// Main Navigation Bar component
import React from 'react';
import { 
  Nav,
  Navbar,
} from 'react-bootstrap';
import LoadNbForm from './LoadNbForm';
import NavBarNbInfo from './NavBarNbInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function NavigationBar({ nbLoaded, nb, unloadNotebook, onChange, onSubmit, onCreateNb }) {
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Navbar.Brand className="title">
        <FontAwesomeIcon className="mr-2" icon={['far', 'sticky-note']} />
        Void-Notes
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="https://github.com/d-spence/void-notes">About</Nav.Link>
        </Nav>
        {!nbLoaded ? 
          <LoadNbForm onChange={onChange} onSubmit={onSubmit} onCreateNb={onCreateNb} />
          : <NavBarNbInfo nb={nb} unloadNotebook={unloadNotebook} />
        }
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;