import React from 'react';
import './Note.css';

function Note(props) {
  return (
    <div className="note">
      <div>{props.title}</div>
      <div>{props.text}</div>
      <div>{props.created}</div>
    </div>
  );
}

export default Note;
