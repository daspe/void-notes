// Display notebook info in navbar if loaded
import React from 'react';
import { Button } from 'react-bootstrap';
import './components.css';

function NavBarNbInfo({ nb, unloadNotes }) {
  return (
    <div className="navbar-nb-info">
      <div>
        <div>Key: {nb.nbKey}</div>
        <div><small>Created: {nb.created}</small></div>
        <div><small>Expires: {nb.expiration}</small></div>
      </div>
      <div className="unload-btn">
        <Button variant="outline-danger" size="sm" onClick={unloadNotes}>Unload</Button>
      </div>
    </div>
  );
}

export default NavBarNbInfo;