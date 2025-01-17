import './App.css';

import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Inventory from './components/Inventory';

const App = () => {
  return (
      <div>
          <h1>App</h1>
          <Router>
              <Route exact path="/register"><Register /></Route>
              <Route exact path="/login"><Login /></Route>
              <Route exact path="/inventory"><Inventory /></Route>
          </Router>
      </div>
  );
}

export default App;
