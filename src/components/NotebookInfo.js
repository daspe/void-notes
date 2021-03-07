import React from 'react';
import './components.css';

function NotebookInfo({ nb, notes }) {
    return (
        <div className="notebook-info container">
            Notebook Key: {nb.nbKey} (Showing {notes.length} Notes)
        </div>
    )
}

export default NotebookInfo;