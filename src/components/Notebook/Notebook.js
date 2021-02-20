import React from 'react';
import Note from '../Notebook/Notebook';
import './Notebook.css';

function Notebook(props) {
  return (
    <div className="notebook">
      <Note />
      <Note />
      <Note />
    </div>
  );
}

export default Notebook;
