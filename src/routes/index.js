import React from 'react'
import { Route, Switch } from 'react-router'
import Loadable from 'react-loadable';
import NotFound from './404';
import RouteWithStatusCode from './../components/router/RouteWithStatusCode';

import Home from './home'

const Search = Loadable({
  loader: () => import(/* webpackChunkName: "search" */ './search'),
  loading: () => null,
  modules: ['search']
});

const Terms = Loadable({
  loader: () => import(/* webpackChunkName: "terms-page" */ './terms'),
  loading: () => null,
  modules: ['terms']
});

const BasicExample = () => (
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/search" component={Search}/>
    <Route path="/terms" component={Terms}/>
    <RouteWithStatusCode code={404} component={NotFound}/>
  </Switch>
)

export default BasicExample