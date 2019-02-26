import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import Header from './components/header';
import Routes from './routes';
import createStore from './store/createStore'

import './App.css';

const store = createStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Header/>
            <Routes/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
