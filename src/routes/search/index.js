import React from 'react';
import { connect } from 'react-redux'
import { asyncIncrement, increment } from './../../store/counter'
import { renderRoutes } from "react-router-config";

const Search = ({ counter, asyncIncrement, increment, route }) => (
  <div>
    <h2>Search</h2>
    <h2>{counter}</h2>
    <button onClick={increment}>Increment</button>
    <hr/>
    <button onClick={asyncIncrement}>Async Increment</button>
    <hr/>
    {renderRoutes(route.routes)}
  </div>
)

const mapStateToProps = state => ({
  counter: state.counter
})

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    increment: () => {
      dispatch(increment())
    },
    asyncIncrement: () => {
      dispatch(asyncIncrement())
    }
  }
}

Search.fetching = async ({store, match}) => {
  store.dispatch(increment())
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)