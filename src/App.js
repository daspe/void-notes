import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faCheckSquare,
  faStickyNote,
  faClock,
  faTimesCircle,
  faTrashAlt,
} from '@fortawesome/free-regular-svg-icons';
import {
  faTools,
  faKey,
} from '@fortawesome/free-solid-svg-icons';

// Import React Components
import NavigationBar from './components/NavigationBar';
import NbControlPanel from './components/NbControlPanel';
import Notebook from './components/Notebook';
import NotebookInfo from './components/NotebookInfo';
import NoteModalForm from './components/NoteModalForm';
import Message from './components/Message';

// Import Bootstrap and App CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Add icons to Font Awesome library
library.add(
  faCheckSquare,
  faStickyNote,
  faClock,
  faTimesCircle,
  faTrashAlt,
  faTools,
  faKey,
);

const API_URL = 'http://localhost:3001/'; // Void-Notes-API URL

const NB_KEY_LENGTH = 30; // Used to verify key length before api request

class App extends Component {
  constructor() {
    super();
    this.state = {
      msg: 'Welcome to Void-Notes!',
      showMsg: true,
      showNoteModal: false,
      inputNbKey: '',
      nbLoaded: false,
      notesLoaded: false,
      nb: {
        nbKey: '',
        created: '',
        expiration: '',
      },
      notes: [],
    };
    this.baseState = this.state; // Initial state of App
    this.unloadNotebook = this.unloadNotebook.bind(this);
    this.toggleMsg = this.toggleMsg.bind(this);
    this.setMsg = this.setMsg.bind(this);
  }

  openNoteModal = () => this.setState({ showNoteModal: true });
  closeNoteModal = () => this.setState({ showNoteModal: false });

  loadNotebook = (data) => {
    this.setState({
      nbLoaded: true,
      nb: {
        nbKey: data.nbKey,
        created: data.created,
        expiration: data.expiration,
      },
    });
  }

  loadNotes = (data) => {
    console.log(data);
    this.setState({
      notesLoaded: true,
      notes: data,
    });
  }

  unloadNotebook = () => {
    // Unload notes and reset to fresh app state 
    this.setState(this.baseState);
    this.setMsg('Notebook was unloaded...');
  }

  onChangeNbKey = (event) => {
    this.setState({
      inputNbKey: event.target.value,
    });
  }

  onSubmitNbKey = () => {
    const submittedNbKey = this.state.inputNbKey;
    if (submittedNbKey.length < NB_KEY_LENGTH || submittedNbKey > NB_KEY_LENGTH) {
      this.setMsg('Incorrect key length. Must be 30 characters long.');
      // return; // Stop if key is the wrong length; comment out for debug
    }
    // Fetch notebook data from API using submitted key
    fetch(`${API_URL}vn/nb/${submittedNbKey}`, {method: 'get'})
    .then(response => response.json())
    .then(nb => {
      if (nb.nbKey) {
        this.loadNotebook(nb); // load the notebook
        this.setMsg('Notebook was loaded!');
        // TODO --> Extract fetch requests into their own functions
        // E.G. handleNbRequest, handleNotesRequest
        fetch(`${API_URL}vn/notes/${nb.nbKey}`, {method: 'get'})
        .then(response => response.json())
        .then(notes => {
          if (notes[0].nbKey) {
            this.loadNotes(notes); // load notes in notebook
          }
        })
      }
    })
    .catch(err => console.log(err));
  }

  onCreateNb = () => {
    // Create a new notebook in the database
    fetch((API_URL + 'vn/nb/create'), {
      method: 'post',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.nb);
      if (data.nb.nbKey) {
        this.loadNotebook(data.nb);
        this.loadNotes([]);
        this.setMsg('Notebook was created!');
      }
    })
    .catch(err => console.log(err));
  }

  onRenewNb = () => {
    // Renew the currently loaded notebook
    if (!this.state.nb.nbKey) {return}; // End function if nbKey not found
    const key = this.state.nb.nbKey;

    fetch((API_URL + 'vn/nb/' + key + '/renew'), {
      method: 'put',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.nb.nbKey) {
        const expiration = data.nb.expiration;
        this.loadNotebook(data.nb); // reload the notebook
        this.setMsg(`Notebook was renewed until ${expiration.slice(0, 10)} (30 days)`);
      }
    })
    .catch(err => console.log(err));
  }

  onDeleteNb = () => {
    // Delete the currently loaded notebook
    if (!this.state.nb.nbKey) {return}; // End function if nbKey not found
    const key = this.state.nb.nbKey;

    fetch((API_URL + 'vn/nb/' + key + '/delete'), {
      method: 'delete',
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.nb.nbKey) {
        this.unloadNotebook(data.nb);
        this.setMsg('Notebook was deleted...');
      }
    })
    .catch(err => console.log(err));
  }

  onCreateNote = (data) => {
    // Create a new note in the database
    if (!this.state.nb.nbKey) {return}; // End function if nbKey not found
    const key = this.state.nb.nbKey;

    fetch((API_URL + 'vn/note/' + key + '/create'), {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: data.title,
        note: data.note,
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.note) {
        let updatedNotes = this.state.notes.slice(); // create copy of this.state.notes
        updatedNotes.push(data.note); // add note to updatedNotes
        this.setState({
          showNoteModal: false, // hide the note modal
          notes: updatedNotes,
        });
        this.setMsg('Note was created!');
      }
    })
    .catch(err => console.log(err));
  }

  onEditNote = (data) => {
    // TODO -- Edit a note with supplied data
    return;
  }

  onDeleteNote = (id) => {
    // Delete a new note in the database
    if (!this.state.nb.nbKey || !id) {return}; // End function if nbKey not found
    const key = this.state.nb.nbKey;

    fetch((`${API_URL}vn/note/${key}/${id}/delete`), {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        confirmDelete: true, // temp; should have a confirmation dialog before deleting
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.note) {
        // Create a copy of state.notes and filter to remove the deleted note
        let updatedNotes = this.state.notes.slice().filter((note) => {
          return note.id !== id;
        });
        this.setState({
          notes: updatedNotes,
        });
        this.setMsg('Note was deleted!');
      }
    })
    .catch(err => console.log(err));
  }

  toggleMsg = () => {
    // Toggle message display on or off
    this.setState({showMsg: !this.state.showMsg});
  }

  setMsg = (msg) => {
    this.setState({
      msg: msg,
      showMsg: true,
    });
  }

  render() {
    return (
      <Router>
        <div>
          <NavigationBar 
            nbLoaded={this.state.nbLoaded}
            nb={this.state.nb}
            unloadNotebook={this.unloadNotebook}
            onChange={this.onChangeNbKey}
            onSubmit={this.onSubmitNbKey}
            onCreateNb={this.onCreateNb}
          />
          {this.state.showMsg &&
            <Message msg={this.state.msg} toggleMsg={this.toggleMsg} />
          }
          <Switch>
            <Route path="/">
              {this.state.nbLoaded &&
              <div>
                <NotebookInfo 
                  className="container"
                  nb={this.state.nb}
                  notes={this.state.notes}
                />
                <NbControlPanel 
                  nb={this.state.nb}
                  openNoteModal={this.openNoteModal}
                  onRenewNb={this.onRenewNb}
                  unloadNotebook={this.unloadNotebook}
                  onDeleteNb={this.onDeleteNb}
                />
                {this.state.showNoteModal &&
                  <NoteModalForm 
                    showNoteModal={this.state.showNoteModal}
                    closeNoteModal={this.closeNoteModal}
                    onCreateNote={this.onCreateNote}
                    onEditNote={this.onEditNote}
                    onDeleteNote={this.onDeleteNote}
                  />
                }
              </div>
              }
              <Notebook
                onDeleteNote={this.onDeleteNote}
                nbLoaded={this.state.nbLoaded}
                notesLoaded={this.state.notesLoaded}
                nb={this.state.nb}
                notes={this.state.notes}
              />
            </Route>
            <Route path="/about">
              
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
