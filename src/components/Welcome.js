// Welcome section that displays info about the site and option to create notebook
import React from 'react';
import {
  Jumbotron,
  Button,
} from 'react-bootstrap';
import { ReactComponent as Logo } from '../images/vn_logo-2.svg';
import './components.css';

function Welcome({ onCreateNb }) {
  return (
    <div className="container-md mt-3">
      <Jumbotron className="d-flex flex-column mw-3 shadow">
        <h2 className="text-center">Welcome to Void-Notes!</h2>
        <p className="text-center">
          The site for <b>temporary, anonymous notes.</b> To get started, simply create a new notebook 
          by clicking the button below!
        </p>
        <Button variant="success" className="mb-3 text-center" onClick={onCreateNb}>+ New Notebook</Button>
        <p>
          When you create a notebook you will be given a <b>unique key</b> which allows you to access your  
          notes from anywhere, on any device with a web browser. <b>No email or login is required.</b> Your notes are 
          stored for <b>30 days</b>, but you can manually renew them at any time within this period.
        </p>
        <p>
          If you have a key for a previously created notebook, you can copy it into the navigation bar field
          at the top of this page. Your key is saved as a cookie and reloaded automatically the next time you visit.
        </p>
        <Logo className="logo" alt="" />
      </Jumbotron>
    </div>
  );
}

export default Welcome;