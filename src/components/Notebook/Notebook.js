import React from 'react';
import Note from '../Note/Note';
import './Notebook.css';

function Notebook({ nbLoaded, notesLoaded, nb, notes }) {
  if (nbLoaded) {
    if (notesLoaded) {
      return (
        <div className="notebook">
          <h2>Notebook {nb.nbKey} was loaded</h2>
          {notes.map(data => (
            <Note key={data.id} data={data} />
          ))}
        </div>
      );
    } else {
      return (
        <div className="notebook">
          <h2>Notebook {nb.nbKey} was loaded</h2>
          <p>There are no notes in this notebook...</p>
        </div>
      );
    }
  } else {
    return (
      <div className="notebook">
        <h2>Notebook not loaded</h2>
      </div>
    );
  }
}

export default Notebook;