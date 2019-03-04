import React from 'react';
import ReactDOM from 'react-dom';

import ClientApp from './ClientApp'
import * as serviceWorker from './serviceWorker';
import './index.css';

// const renderApp = (app) => {
//   const root = document.getElementById('root');
  
//   if (root.hasChildNodes() === true) {
//     // If it's an SSR, we use hydrate to get fast page loads by just
//     // attaching event listeners after the initial render
//     ReactDom.hydrate(app, root);
//   } else {
//     // If we're not running on the server, just render like normal
//     ReactDom.render(app, root);
//   }
// }

ReactDOM.render(<ClientApp />, document.getElementById('root'));

// Enable hot reload
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./ClientApp', () => {
      ReactDOM.render(<ClientApp />, document.getElementById('root'))
    })
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
