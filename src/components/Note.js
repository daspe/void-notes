import React from 'react';
import NoteControlPanel from './NoteControlPanel';
import './components.css';

function Note({ data, onDeleteNote }) {
  const { id, title, note } = data;
  return (
    <div className="note">
      <div className="note-title">({id}) {title}</div>
      <div className="note-body">{note}</div>
      <NoteControlPanel id={id} onDeleteNote={onDeleteNote} />
    </div>
  );
}

export default Note;