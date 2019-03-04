import React from "react";
import { connect } from "react-redux";
import { renderRoutes } from "react-router-config";

import { asyncIncrement, increment } from "./../../store/counter";

class Example extends React.Component {
  /**
   *
   * @param {object} param
   *   @property {object} store
   *   @property {object} match - route for matched component
   */
  static async fetching({ store, match }) {
    store.dispatch(increment());
    await store.dispatch(asyncIncrement());
  }

  render() {
    const { counter, asyncIncrement, increment, route, match } = this.props;

    return (
      <div>
        <h1>Test data prefetch and nested routing</h1>
        <div>
          <code>{JSON.stringify(route)}</code>
        </div>
        <div>
          <code>{JSON.stringify(match)}</code>
        </div>

        <h2>Counter: {counter}</h2>
        <button onClick={increment}>Increment</button>
        <button onClick={asyncIncrement}>Async Increment</button>
        
        <h2>Nested routes</h2>
        <div>
          {renderRoutes(route.routes)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counter: state.counter
});

const mapDispatchToProps = dispatch => ({
  increment: () => {
    dispatch(increment());
  },
  asyncIncrement: () => {
    dispatch(asyncIncrement());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Example);
