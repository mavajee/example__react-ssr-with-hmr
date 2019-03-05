import React, { Component } from 'react';
import { renderRoutes } from "react-router-config";

import Header from './components/header';
import routes from './routes';

class App extends Component {
  render() {
    return (<div>
        <Header/>
        {renderRoutes(routes)}
      </div>
    );
  }
}

export default App;
