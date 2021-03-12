// Panel component for a note that contains edit and delete buttons
import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function NoteControlPanel({ id, onDeleteNote }) {
  return (
    // display edit button
    //display delete button
    <Button variant="danger" onClick={() => onDeleteNote(id)}>
      <FontAwesomeIcon size="sm" icon={['far', 'trash-alt']} />
    </Button>
  );
}

export default NoteControlPanel;