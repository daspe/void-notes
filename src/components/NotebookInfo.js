import React from 'react';
import './components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NotebookInfo({ nb, notes }) {
    return (
        <div className="notebook-info container">
            <FontAwesomeIcon className="mr-2" icon={['fas', 'key']} />
            {nb.nbKey} (Showing {notes.length} Notes)
        </div>
    )
}

export default NotebookInfo;