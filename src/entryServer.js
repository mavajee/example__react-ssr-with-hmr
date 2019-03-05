import React from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";

import BaseLayout from "./BaseLayout";
import createStore from "./store/createStore";
import Loadable from "react-loadable";

import routes from "./routes";
import { matchRoutes } from "react-router-config";

export default async function createAppRender() {
  await Loadable.preloadAll();

  return async function renderApp(routeLocation, context) {
    const store = createStore();

    const routeMatches = [];
    const preloadComponentPromises = [];

    matchRoutes(routes, routeLocation).forEach(({ route, match }) => {
      routeMatches.push(match);
      preloadComponentPromises.push(
        route.component
          ? route.component.preload
            ? route.component.preload().then(res => res.default)
            : route.component
          : null
      );
    });

    const fetchingPromises = (await Promise.all(preloadComponentPromises)).map(
      (component, index) => {
        return component && component.fetching
          ? component.fetching({ store, match: routeMatches[index] })
          : null;
      }
    );

    await Promise.all(fetchingPromises);

    context.state = store.getState();

    return (
      <Provider store={store}>
        <StaticRouter location={routeLocation} context={context}>
          <BaseLayout />
        </StaticRouter>
      </Provider>
    );
  };
}
