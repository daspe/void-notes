// Display notebook info in navbar if loaded
import React from 'react';
import './components.css';

function NavBarNbInfo({ nb }) {
  return (
    <div className="navbar-nb-info">
      <div>Key: {nb.nbKey}</div>
      <div><small>Created: {nb.created}</small></div>
      <div><small>Expires: {nb.expiration}</small></div>
    </div>
  );
}

export default NavBarNbInfo;