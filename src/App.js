import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
      input: '',
      route: 'login',
      current: {
        id: '',
        notes: [],
      }
    }
  }

  render() {
    const { input, route, current } = this.state;
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
              <h1>Notebook</h1>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
