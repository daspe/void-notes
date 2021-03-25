import React from 'react';
import Note from './Note';
import './components.css';

function Notebook({ 
  onDeleteNote,
  openNoteModal,
  openConfirmModal,
  nbLoaded,
  notesLoaded,
  notes,
  inputSearchBox,
  }) {
  // Filter notes based on SearchBox input
  const filteredNotes = notes.filter(note => {
    if (note.title.toLowerCase().includes(inputSearchBox.toLowerCase())) {
      return true;
    } else if (note.note.toLowerCase().includes(inputSearchBox.toLowerCase())) {
      return true;
    }
    return false;
  });

  if (nbLoaded) {
    if (notes.length > 0) {
      if (filteredNotes.length > 0) {
        return (
          <div>
            <div className="notebook vn-container container">
              {filteredNotes.map(data => (
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
        <div className="vn-container container">
          <p className="text-center">
            No search results were found.
          </p>
        </div>
        );
      }
    } else {
      return (
        <div className="vn-container container">
          <p className="text-center">
            There are no notes in your notebook. Click the <b>'Create Note'</b> button above to add one.
          </p>
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