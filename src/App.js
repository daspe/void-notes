import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Notebook from './components/Notebook/Notebook';
import NbKeyForm from './components/NbKeyForm/NbKeyForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

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
    console.log('this works');
  }

  render() {
    return (
      <Router>
        <div>
          {/* <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/vn">Notebook</Link>
            </li>
          </ul> */}

          <Switch>
            <Route path="/">
              <NavigationBar />
              {/* <NbKeyForm
                onChange={this.onChangeNbKey}
                onSubmit={this.onSubmitNbKey}
              /> */}
            </Route>
            <Route path="/vn">
              <NavigationBar />
              {/* <Notebook nb={this.state.nb} notes={this.state.notes}/> */}
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
