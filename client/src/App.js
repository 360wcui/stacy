import './App.css';

import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Register from './components/Register';
import Login from './components/Login';
import Inventory from './components/Inventory';
import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";

const App = () => {
  return (
      <div>
          <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                  <Toolbar>
                      <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                          Inventory Management System
                      </Typography>
                      <Button color="inherit">Login</Button>
                      <Button color="inherit">Register</Button>
                      {/*<a href='/register'>REGISTER</a>*/}
                  </Toolbar>
              </AppBar>
          </Box>
          <Router>
              <Route exact path="/register"><Register /></Route>
              <Route exact path="/login"><Login /></Route>
              <Route exact path="/inventory"><Inventory /></Route>
          </Router>
      </div>
  );
}

export default App;
