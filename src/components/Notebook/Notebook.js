import React from 'react';
import Note from '../Note/Note';
import './Notebook.css';

function Notebook({ nbLoaded, notesLoaded, nb, notes }) {
  if (nbLoaded) {
    if (notesLoaded) {
      return (
        <div>
          <div className="notebook">
            {notes.map(data => (
              <Note key={data.id} data={data} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="notebook">
            <p>There are no notes in this notebook...</p>
          </div>
        </div>
      );
    }
  } else {
    return null;
  }
}

export default Notebook;