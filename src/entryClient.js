import React from "react";
import ReactDOM from "react-dom";

import ClientApp from "./ClientApp";
import * as serviceWorker from "./serviceWorker";
import "./index.css";

import routes from "./routes";
import { matchRoutes } from "react-router-config";

// ReactDOM.render(<ClientApp />, document.getElementById('root'));
const root = document.getElementById("root");

if (root.hasChildNodes() === true) {
  // To avoid hydrate warning and app rerender we should preload all needed async component
  const promises = matchRoutes(routes, window.location.pathname).map(
    ({ route }) =>
      route.component
        ? route.component.preload
          ? route.component.preload().then(res => res.default)
          : route.component
        : null
  );

  Promise.all(promises).then(() => {
    ReactDOM.hydrate(<ClientApp />, root);
  });
} else {
  // If we're not running on the server, just render like normal
  ReactDOM.render(<ClientApp />, root);
}

// Enable hot reload
if (process.env.NODE_ENV === "development") {
  if (module.hot) {
    module.hot.accept("./ClientApp", () => {
      ReactDOM.render(<ClientApp />, root);
    });
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
