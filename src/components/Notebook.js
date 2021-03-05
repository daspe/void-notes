import React from 'react';
import Note from './Note';
import NotebookInfo from './NotebookInfo';
import './components.css';

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
    return (
      <div className="notebook">
        <p>A notebook is not loaded :(</p>
      </div>
    );
  }
}

export default Notebook;