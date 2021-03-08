// Panel component for notebook containing new note, delete, and renew buttons
import React from 'react';
import {
  ButtonToolbar,
  ButtonGroup,
  Button,
  DropdownButton,
  Dropdown,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function NbControlPanel({ nb, onDeleteNb }) {
  return (
    <div className="container">
      <ButtonToolbar aria-label="Toolbar with button groups">
        <ButtonGroup className="mr-2" aria-label="First group">
          <Button variant="success">
            <FontAwesomeIcon className="mr-2" icon={['far', 'sticky-note']} />
            Create Note
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2" aria-label="Second group">
          <DropdownButton 
            as={ButtonGroup}
            drop="right"
            variant="secondary"
            title="Notebook Actions"
            id="bg-nested-dropdown"
          >
            <Dropdown.Item as="button">
              <FontAwesomeIcon className="mr-2" icon={['far', 'clock']} />
              Renew Notebook
            </Dropdown.Item>
            <Dropdown.Item as="button">
              <FontAwesomeIcon className="mr-2" icon={['far', 'times-circle']} />
              Unload Notebook
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={onDeleteNb}>
              <FontAwesomeIcon className="mr-2" icon={['far', 'trash-alt']} />
              Delete Notebook
            </Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
}

export default NbControlPanel;