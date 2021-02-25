// Main Navigation Bar component
import React from 'react';
import { 
  Nav,
  Navbar,
  Form,
  FormControl,
  Button
} from 'react-bootstrap';

function NavigationBar() {
  return (
    <Navbar bg="light" expand="sm">
      <Navbar.Brand href="/">Void-Notes</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/vn">Link</Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Enter Notebook Key" className="mr-sm-2" />
          <Button variant="outline-secondary">Submit</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;