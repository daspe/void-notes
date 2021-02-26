import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';

// Import Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faStickyNote } from '@fortawesome/free-regular-svg-icons';

// Import React Components
import NavigationBar from './components/NavigationBar/NavigationBar';
import Notebook from './components/Notebook/Notebook';

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
      msg: '',
      inputNbKey: '',
      nbLoaded: false,
      notesLoaded: false,
      nb: {
        nbKey: '',
        created: '',
        expiration: '',
      },
      notes: [],
    }
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

  render() {
    return (
      <Router>
        <div>
          <NavigationBar 
            nbLoaded={this.state.nbLoaded}
            onChange={this.onChangeNbKey}
            onSubmit={this.onSubmitNbKey}
          />
          <Switch>
            <Route path="/">
              <Notebook
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
