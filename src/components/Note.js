import React from 'react';
import NoteControlPanel from './NoteControlPanel';
import './components.css';

function Note({ data, onDeleteNote, fillNoteModal }) {
  const { id, title, note } = data;
  return (
    <div className="note">
      <div className="note-title">({id}) {title}</div>
      <div className="note-body">{note}</div>
      <NoteControlPanel 
        data={data}
        onDeleteNote={onDeleteNote}
        fillNoteModal={fillNoteModal}
      />
    </div>
  );
}

export default Note;