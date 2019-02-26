import React from 'react';
import { Link } from 'react-router-dom'

export default () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/search">Search</Link>
    </li>
    <li>
      <Link to="/terms">Terms</Link>
    </li>
  </ul>
)
