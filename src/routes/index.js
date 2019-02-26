import React from 'react'
import { Route } from 'react-router-dom'

import Home from './home'
import Search from './search'
import Terms from './terms'

const BasicExample = () => (
  <div>
    <Route exact path="/" component={Home}/>
    <Route path="/search" component={Search}/>
    <Route path="/terms" component={Terms}/>
  </div>
)

export default BasicExample