import React, { Component } from 'react';
import {
 Route, Switch, Redirect,
} from 'react-router-dom';
import Home from "./Home";
import Team from './Team';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/teams" />} />
          <Route exact path="/teams" component={Home} />
          <Route path="/teams/:id" component={Team} />
        </Switch>
      </div>
    );
  }
}

export default App;
