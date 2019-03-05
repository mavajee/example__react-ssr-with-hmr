import React from "react";
import Loadable from "react-loadable";

import NotFound from "./404";
import Home from "./home";

const Search = Loadable({
  loader: () => import(/* webpackChunkName: "search-page" */ "./search"),
  loading: () => null,
  modules: ["search"]
});

const Terms = Loadable({
  loader: () => import(/* webpackChunkName: "terms-page" */ "./terms"),
  loading: () => null,
  modules: ["terms"]
});

const Example = Loadable({
  loader: () => import(/* webpackChunkName: "example-page" */ "./example"),
  loading: () => null,
  modules: ["example"]
});

export default [
  {
    path: "/home",
    exact: true,
    component: Home
  },
  {
    path: "/search",
    exact: true,
    component: Search
  },
  {
    path: "/terms",
    exact: true,
    component: Terms
  },
  {
    path: "/example",
    component: Example,
    routes: [
      {
        path: "/example/nested",
        exact: true,
        component: () => (
          <div id="test" class="test">
            Test
          </div>
        )
      }
    ]
  },
  {
    render({ staticContext }) {
      if (staticContext) staticContext.status = 404;
      return React.createElement(NotFound);
    }
  }
];
