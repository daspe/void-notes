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
import SearchBox from './SearchBox';

function NbControlPanel({ 
  openNoteModal,
  openConfirmModal,
  onRenewNb,
  unloadNotebook,
  onDeleteNb,
  onChangeSearchBox,
}) {
  return (
    <div className="vn-container container">
      <ButtonToolbar aria-label="Toolbar with buttons for notebook control">
        <ButtonGroup className="mr-2" aria-label="First group">
          <Button variant="success" onClick={openNoteModal}>
            <FontAwesomeIcon className="mr-2" icon={['far', 'sticky-note']} />
            Create Note
          </Button>
        </ButtonGroup>
        <ButtonGroup className="mr-2" aria-label="Second group">
          <DropdownButton 
            as={ButtonGroup}
            drop="down"
            variant="secondary"
            title="Notebook Actions"
            id="bg-nested-dropdown"
          >
            <Dropdown.Item as="button" onClick={onRenewNb}>
              <FontAwesomeIcon className="mr-2" icon={['far', 'clock']} />
              Renew Notebook
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={unloadNotebook}>
              <FontAwesomeIcon className="mr-2" icon={['far', 'times-circle']} />
              Unload Notebook
            </Dropdown.Item>
            <Dropdown.Item as="button" onClick={() => {
              openConfirmModal('Are you sure you want to delete this notebook?', onDeleteNb);
            }}>
              <FontAwesomeIcon className="mr-2" icon={['far', 'trash-alt']} />
              Delete Notebook
            </Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
        <SearchBox onChangeSearchBox={onChangeSearchBox} />
      </ButtonToolbar>
    </div>
  );
}

export default NbControlPanel;