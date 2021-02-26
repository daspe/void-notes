// Main Navigation Bar component
import React from 'react';
import { 
  Nav,
  Navbar,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function NavigationBar({ nbLoaded, onChange, onSubmit }) {
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
        <Form inline>
          <FormControl type="text" placeholder="Enter Notebook Key" className="mr-sm-2" onChange={onChange}/>
          <Button variant="outline-secondary" onClick={onSubmit}>Submit</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;