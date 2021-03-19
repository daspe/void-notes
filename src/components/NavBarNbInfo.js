// Display notebook info in navbar if loaded
import React from 'react';
import {
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './components.css';

function NavBarNbInfo({ nb, unloadNotebook, setMsg }) {
  return (
    <div className="navbar-nb-info">
      <div>
        <div>
          <FontAwesomeIcon className="mr-2" icon={['fas', 'key']} />
          <span>{nb.nbKey}</span>
        </div>
        <div><small>Created: {nb.created.slice(0, 10)}</small></div>
        <div><small>Expires: {nb.expiration.slice(0, 10)}</small></div>
      </div>
      <div>
        <ButtonGroup size="sm" className="ml-2" vertical>
          <Button 
            variant="outline-secondary"
            onClick={() => {
              navigator.clipboard.writeText(nb.nbKey);
              setMsg("Notebook key was copied to clipboard!");
            }}>
              Copy Key
          </Button>
          <Button 
            variant="outline-danger"
            onClick={unloadNotebook}>
              Unload
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default NavBarNbInfo;