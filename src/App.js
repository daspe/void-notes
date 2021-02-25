import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCheckSquare, faStickyNote } from '@fortawesome/free-regular-svg-icons';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Notebook from './components/Notebook/Notebook';
import NbKeyForm from './components/NbKeyForm/NbKeyForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Add icons to Font Awesome library
library.add(faCheckSquare, faStickyNote);

const API_URL = 'http://localhost:3001/'; // Void-Notes-API URL

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputNbKey: '',
      nbLoaded: false,
      notesLoaded: false,
      nb: {
        nb_key: '',
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
        nb_key: data.nb_key,
        created: data.created,
        expiration: data.expiration,
      },
    });
  }

  loadNotes = (data) => {
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
    console.log(this.state.inputNbKey);
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
              
            </Route>
            <Route path="/vn">
              {/* <Notebook nb={this.state.nb} notes={this.state.notes}/> */}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
