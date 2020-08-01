import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from './logo.svg';
import img from './details-black-48dp.svg';
import './App.css';

import AddNote from "./components/add-note.component";
import Note from "./components/note.component";
import NotesList from "./components/notes-list.component";
// import NoteEditor from "./components/note-editor.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand navbar-dark bg-light">
            <a href="/notes" className="navbar-brand"><img src="./details-black-48dp.svg"></img></a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/notes"} className="nav-link">Notas</Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">Nova nota</Link>
              </li>
            </div>
          </nav>
          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/notes"]} component={NotesList} />
              <Route exact path="/add" component={AddNote} />
              <Route exact path="/notes/:id" component={Note} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }; //talvez tirar ;
}; //talvez tirar ;




export default App;
