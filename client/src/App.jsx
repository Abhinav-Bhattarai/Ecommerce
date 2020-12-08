import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Mainroute from './Containers/MainRoute/Mainroute';

class App extends Component{
  render(){
    return (
      <Fragment>
          <Router>
            <Mainroute/>
          </Router>
      </Fragment>
    )
  }
}

export default App