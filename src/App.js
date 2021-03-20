import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faCheckSquare,
  faStickyNote,
  faClock,
  faTimesCircle,
  faTrashAlt,
  faEdit,
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
import ConfirmModal from './components/ConfirmModal';
import Message from './components/Message';
import Welcome from './components/Welcome';

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
  faEdit,
  faTools,
  faKey,
);

const API_URL = 'http://localhost:3001/'; // Void-Notes-API URL

const NB_KEY_LENGTH = 30; // Used to verify key length before api request

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    this.state = {
      msg: 'Welcome to Void-Notes!',
      showMsg: false,
      showConfirmModal: false,
      confirmModalMsg: '',
      confirmModalAction: null,
      confirmModalArg: null,
      showNoteModal: false,
      noteModalTitle: '',
      noteModalText: '',
      noteModalEdit: false,
      inputNbKey: '',
      nbLoaded: false,
      notesLoaded: false,
      nbKeyFromCookie: cookies.get('nbKey') || '',
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

  componentDidMount() {
    // Load automatically from cookie when App loads (page refresh)
    this.loadNbFromCookie();
  }

  loadNbFromCookie = () => {
    // Load notebook from nbKey cookie
    if (!this.state.nbKeyFromCookie) {return}; // End function if nbKey not found
    this.onSubmitNbKey(this.state.nbKeyFromCookie);
  }

  handleSetCookie = (nbKey) => {
    const { cookies } = this.props;
    cookies.set('nbKey', nbKey, {
      path: '/', 
      maxAge: 2678400, // expires 31 days from now
      sameSite: 'lax',
    });
  }

  handleRemoveCookie = () => {
    const { cookies } = this.props;
    cookies.remove('nbKey');
  }

  closeConfirmModal = () => {
    this.setState({
      showConfirmModal: false,
      confirmModalMsg: '',
      confirmModalAction: null,
      confirmModalArg: null,
    });
  }

  openConfirmModal = (msg, action, arg=null) => {
    this.setState({
      showConfirmModal: true,
      confirmModalMsg: msg,
      confirmModalAction: action,
      confirmModalArg: arg,
    });
  }

  onConfirm = () => {
    // Run the function that was set when openConfirmModal was called
    if (this.state.confirmModalArg) {
      this.state.confirmModalAction(this.state.confirmModalArg);
    } else {
      this.state.confirmModalAction();
    }
    this.closeConfirmModal(); // close and reset confirm modal
  }

  closeNoteModal = () => {
    this.setState({ 
      showNoteModal: false,
      noteModalId: null,
      noteModalTitle: '',
      noteModalText: '',
      noteModalEdit: false,
    });
  }

  openNoteModal = (id=null, title='', text='') => {
    const noteModalEdit = (title || text) ? true : false;
    // Fill the input fields of note modal with string arguments
    this.setState({
      showNoteModal: true,
      noteModalId: id,
      noteModalTitle: title,
      noteModalText: text,
      noteModalEdit: noteModalEdit,
    });
  }

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
    this.handleRemoveCookie();
    this.setMsg('Notebook was unloaded...');
  }

  onChangeNbKey = (event) => {
    this.setState({
      inputNbKey: event.target.value,
    });
  }

  onSubmitNbKey = () => {
    const { inputNbKey, nbKeyFromCookie } = this.state;
    // If inputNbKey is blank, try to get key from cookie
    const submittedNbKey = inputNbKey ? inputNbKey : nbKeyFromCookie;
    if (!submittedNbKey) {
      this.setMsg('Notebook could not be loaded...');
      return;
    }
    // Make sure the key is the correct length before submitting
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
        this.handleSetCookie(nb.nbKey); // set cookie
        this.setMsg('Notebook was loaded!');
        // Fetch notes from API
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
        this.handleSetCookie(data.nb.nbKey);
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
        this.handleSetCookie(data.nb.nbKey); // set cookie with new expiration
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
        this.handleRemoveCookie();
        this.setMsg('Notebook was deleted...');
      }
    })
    .catch(err => console.log(err));
  }

  onCreateNote = (data) => {
    // Create a new note in the database
    if (!this.state.nb.nbKey) {return}; // End function if nbKey not found
    const key = this.state.nb.nbKey;

    fetch(`${API_URL}vn/note/${key}/create`, {
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
    // Edit a note in the database
    if (!this.state.nb.nbKey || !data.id) {return}; // End function if nbKey not found
    const key = this.state.nb.nbKey;

    fetch(`${API_URL}vn/note/${key}/${data.id}/edit`, {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        newTitle: data.title,
        newNote: data.note,
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.note) {
        // Create a copy of state.notes and filter to remove the unedited note
        let updatedNotes = this.state.notes.slice().filter(note => {
          return note.id !== data.note.id;
        });
        updatedNotes.push(data.note); // add edited note to updatedNotes
        this.setState({
          showNoteModal: false, // hide the note modal
          notes: updatedNotes,
        });
        this.setMsg('Note was edited!');
      }
    })
    .catch(err => console.log(err));
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
        let updatedNotes = this.state.notes.slice().filter(note => {
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
        <header>
          <NavigationBar 
            nbLoaded={this.state.nbLoaded}
            nb={this.state.nb}
            unloadNotebook={this.unloadNotebook}
            onChange={this.onChangeNbKey}
            onSubmit={this.onSubmitNbKey}
            onCreateNb={this.onCreateNb}
            setMsg={this.setMsg}
          />
        </header>
        <main className="content">
          {this.state.showMsg &&
            <Message msg={this.state.msg} toggleMsg={this.toggleMsg} />
          }
          <Switch>
            <Route path="/">
              {this.state.nbLoaded &&
              <div>
                <NotebookInfo 
                  className="vn-container container"
                  nb={this.state.nb}
                  notes={this.state.notes}
                />
                <NbControlPanel 
                  nb={this.state.nb}
                  openNoteModal={this.openNoteModal}
                  openConfirmModal={this.openConfirmModal}
                  onRenewNb={this.onRenewNb}
                  unloadNotebook={this.unloadNotebook}
                  onDeleteNb={this.onDeleteNb}
                />
                <Notebook
                  onDeleteNote={this.onDeleteNote}
                  openNoteModal={this.openNoteModal}
                  openConfirmModal={this.openConfirmModal}
                  nbLoaded={this.state.nbLoaded}
                  notesLoaded={this.state.notesLoaded}
                  notes={this.state.notes}
                />
                {this.state.showConfirmModal &&
                  <ConfirmModal
                    msg={this.state.confirmModalMsg}
                    closeConfirmModal={this.closeConfirmModal}
                    openConfirmModal={this.openConfirmModal}
                    onConfirm={this.onConfirm}
                  />
                }
                {this.state.showNoteModal &&
                  <NoteModalForm 
                    showNoteModal={this.state.showNoteModal}
                    noteModalId={this.state.noteModalId}
                    noteModalTitle={this.state.noteModalTitle}
                    noteModalText={this.state.noteModalText}
                    noteModalEdit={this.state.noteModalEdit}
                    closeNoteModal={this.closeNoteModal}
                    onCreateNote={this.onCreateNote}
                    onEditNote={this.onEditNote}
                  />
                }
              </div>
              } 
              {!this.state.nbLoaded &&
                <Welcome onCreateNb={this.onCreateNb} />
              }
            </Route>
            <Route path="/about">
              
            </Route>
          </Switch>
        </main>
        <footer className="footer">
          © 2021 <a href="https://dspence.net/" rel="noreferrer" target="_blank">Dan Spencer</a>
        </footer>
      </Router>
    );
  }
}

export default withCookies(App);
