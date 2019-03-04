import React from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';

import BaseLayout from './BaseLayout';
import createStore from './store/createStore'

let initialState = {};

if (window.__INITIAL_STATE__) {
  initialState = window.__INITIAL_STATE__;
  delete window.__INITIAL_STATE__;
}

const store = createStore(initialState);

export default () => (
  <Provider store={store}>
    <BrowserRouter>
      <BaseLayout />
    </BrowserRouter>
  </Provider>
);
