import React from 'react';
import Note from '../Notebook/Notebook';
import './Notebook.css';

function Notebook(props) {
  return (
    <div className="notebook">
      {props.notebook.notes.map(data => (
        <Note data={data} />
      ))}
    </div>
  );
}

export default Notebook;
