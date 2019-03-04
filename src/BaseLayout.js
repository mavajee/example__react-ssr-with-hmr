import React, { Component } from 'react';
// import { Provider } from 'react-redux'
import { matchRoutes, renderRoutes } from "react-router-config";

import Header from './components/header';
// import Routes from './routes';
import routes from './routes/routes';
// import createStore from './store/createStore'

// const store = createStore();

if (typeof window === 'object') {
  console.log(matchRoutes(routes, window.location.pathname))
}

class App extends Component {
  render() {
    return (<main>
        <Header/>
        {/* <Routes/> */}
        {renderRoutes(routes)}
      </main>
    );
  }
}

export default App;
