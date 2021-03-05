import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faStickyNote } from '@fortawesome/free-regular-svg-icons';

// Import React Components
import NavigationBar from './components/NavigationBar';
import Notebook from './components/Notebook';
import Message from './components/Message';

// Import Bootstrap and App CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Add icons to Font Awesome library
library.add(faCheckSquare, faStickyNote);

const API_URL = 'http://localhost:3001/'; // Void-Notes-API URL

class App extends Component {
  constructor() {
    super();
    this.state = {
      msg: 'Welcome to Void-Notes!',
      showMsg: true,
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
    this.unloadNotes = this.unloadNotes.bind(this);
    this.toggleMsg = this.toggleMsg.bind(this);
    this.setMsg = this.setMsg.bind(this);
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
    this.setMsg('Notebook was loaded!');
  }

  loadNotes = (data) => {
    console.log(data);
    this.setState({
      notesLoaded: true,
      notes: data,
    });
  }

  unloadNotes = () => {
    this.setState(this.baseState);
    this.setMsg('Notebook was unloaded...');
  }

  onChangeNbKey = (event) => {
    this.setState({
      inputNbKey: event.target.value,
    });
  }

  onSubmitNbKey = () => {
    const SubmittedNbKey = this.state.inputNbKey;
    // this.setState({nb: {nbKey: this.state.inputNbKey}});
    // Fetch notebook data from API using submitted key
    fetch((API_URL + 'vn/nb/' + SubmittedNbKey), {
      method: 'get',
    })
    .then(response => response.json())
    .then(nb => {
      if (nb.nbKey) {
        this.loadNotebook(nb); // load the notebook
        fetch((API_URL + 'vn/notes/' + nb.nbKey), {
          method: 'get',
        })
        .then(response => response.json())
        .then(notes => {
          if (notes[0].nbKey) {
            this.loadNotes(notes); // load notes in notebook
          }
        })
        .catch(err => console.log(err));
      }
      // console.log(this.state.nb, this.state.nbLoaded); // debug
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
            unloadNotes={this.unloadNotes}
            onChange={this.onChangeNbKey}
            onSubmit={this.onSubmitNbKey}
          />
          {this.state.showMsg &&
            <Message msg={this.state.msg} toggleMsg={this.toggleMsg} />
          }
          <Switch>
            <Route path="/">
              <Notebook
                setMsg={this.setMsg}
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
