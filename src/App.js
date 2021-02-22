import React, { Component } from 'react';
import Notebook from './components/Notebook/Notebook';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import './App.css';

// temp databases
const db_notebooks = [
  {
    id: '1358',
    accessed: new Date(),
    expiration: 30
  },
  {
    id: '1205',
    accessed: new Date(),
    expiration: 30
  }
];

const db_notes = [
  {
    id: 1,
    notebook_id: '1358',
    title: 'Test Note 1',
    text: 'This is some text.',
    created: new Date(),
    meta: {}
  },
  {
    id: 2,
    notebook_id: '1358',
    title: 'Test Note 2',
    text: 'This is some more text.',
    created: new Date(),
    meta: {}
  },
  {
    id: 3,
    notebook_id: '1205',
    title: 'Test Note 3',
    text: 'This is even more text.',
    created: new Date(),
    meta: {}
  }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputID: '1358',
      notebook: {
        id: '',
        notes: [],
      }
    }
  }

  checkNotebookExists = (id) => {
    // Return true if notebook exists
    const notebook = db_notebooks.filter(nb => {
      return nb.id === id ? true : false;
      }
    );
    return notebook.length === 1 ? true : false;
  }

  loadNotebook = (id) => {
    if (this.checkNotebookExists(id)) {
      try {
        // Get all notes from notebook with matching id
        const notes = db_notes.filter(note => {
          return note.id === id ? true : false;
        });
        console.log(notes); // debug
        // Load notebook into App state
        this.setState(
          {
            notebook: {
              id: id,
              notes: notes
            }
          }
        );
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('Error: Could not find notebook with that ID.')
    }
  }

  render() {
    // const { notebook } = this.state;
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/nb">Notebook</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/">
              <h1>Home</h1>
            </Route>
            <Route path="/nb">
              <Notebook notebook={this.state.notebook} loadNotebook={this.loadNotebook} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
