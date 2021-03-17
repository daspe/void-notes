import React from 'react';
import Note from './Note';
import './components.css';

function Notebook({ 
  onDeleteNote,
  openNoteModal,
  openConfirmModal,
  nbLoaded,
  notesLoaded,
  notes 
}) {
  if (nbLoaded) {
    if (notesLoaded && notes.length > 0) {
      return (
        <div>
          <div className="notebook vn-container container">
            {notes.map(data => (
              <Note
                key={data.id}
                data={data}
                onDeleteNote={onDeleteNote}
                openNoteModal={openNoteModal}
                openConfirmModal={openConfirmModal}
              />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="vn-container container">
            <p className="text-center">
              There are no notes in your notebook. Click the <b>'Create Note'</b> button above to add one.
            </p>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div className="vn-container container">
        <p className="text-center">A notebook is not loaded :(</p>
      </div>
    );
  }
}

export default Notebook;