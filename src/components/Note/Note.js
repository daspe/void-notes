import React from 'react';
import './Note.css';

function Note(props) {
  const { title, text, created } = props.data;
  return (
    <div className="note">
      <div>{title}</div>
      <div>{text}</div>
      <div>{created}</div>
    </div>
  );
}

export default Note;
