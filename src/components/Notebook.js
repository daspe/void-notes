import React from 'react';
import Note from './Note';
import './components.css';

function Notebook({ 
  onDeleteNote,
  fillNoteModal,
  nbLoaded,
  notesLoaded,
  notes 
}) {
  if (nbLoaded) {
    if (notesLoaded) {
      return (
        <div>
          <div className="notebook container">
            {notes.map(data => (
              <Note
                key={data.id}
                data={data}
                onDeleteNote={onDeleteNote}
                fillNoteModal={fillNoteModal}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="notebook container">
            <p>There are no notes in this notebook...</p>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="notebook container">
        <p>A notebook is not loaded :(</p>
      </div>
    );
  }
}

export default Notebook;