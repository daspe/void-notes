import React from 'react';
import './Note.css';

function Note(props) {
  const { id, title, note } = props.data;
  return (
    <div className="note">
      <div className="note-title">({id}) {title}</div>
      <div>{note}</div>
    </div>
  );
}

export default Note;