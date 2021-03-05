import React from 'react';

function NotebookInfo({ nb, notes }) {
    return (
        <div className="notebook-info">
            Key: {nb} - {notes.length} Notes
        </div>
    )
}