import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './components/header';
import Routes from './routes';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Header/>
          <Routes/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
