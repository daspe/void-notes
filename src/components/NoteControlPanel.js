// Panel component for a note that contains edit and delete buttons
import React from 'react';
import { 
  ButtonToolbar,
  ButtonGroup,
  Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function NoteControlPanel({ id, onEditNote, onDeleteNote }) {
  return (
    <div className="note-control-panel">
      <ButtonToolbar aria-label="Toolbar with buttons for note edit and delete">
        <ButtonGroup aria-label="First group">
          {/* display edit button */}
          <Button variant="outline-info" onClick={() => onEditNote(id)}>
            <FontAwesomeIcon size="sm" icon={['far', 'edit']} />
          </Button>
          {/* display delete button */}
          <Button variant="outline-danger" onClick={() => onDeleteNote(id)}>
            <FontAwesomeIcon size="sm" icon={['far', 'trash-alt']} />
          </Button>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
}

export default NoteControlPanel;