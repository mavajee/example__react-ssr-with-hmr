import {
  createStore as createReduxStore,
  compose,
  applyMiddleware
} from "redux";
import thunk from "redux-thunk";

import { makeRootReducer } from "./reducers";

export default (preloadedState = {}) => {
  const middleware = [thunk];

  let composeEnhancers = compose;

  if (process.env.NODE_ENV === "development") {
    if (
      typeof window === "object" &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      });
    }
  }

  const enhancer = composeEnhancers(applyMiddleware(...middleware));

  const store = createReduxStore(makeRootReducer(), preloadedState, enhancer);

  // Save store after HMR
  if (process.env.NODE_ENV === 'development') {
    if (typeof window === 'object') {
      if (typeof window.store === 'object') {
        return window.store
      }
      window.store = store
    }
  }
  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     store.replaceReducer(rootReducer)
  //   })
  // }

  return store;
};
