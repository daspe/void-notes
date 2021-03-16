import React from 'react';
import NoteControlPanel from './NoteControlPanel';
import './components.css';

function Note({ data, onDeleteNote, openNoteModal, openConfirmModal }) {
  const { id, title, note } = data;
  return (
    <div className="note">
      <div className="note-title">({id}) {title}</div>
      <div className="note-body">{note}</div>
      <NoteControlPanel 
        data={data}
        onDeleteNote={onDeleteNote}
        openNoteModal={openNoteModal}
        openConfirmModal={openConfirmModal}
      />
    </div>
  );
}

export default Note;