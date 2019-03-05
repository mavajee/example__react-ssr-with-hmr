import React from "react";
import { Link } from "react-router-dom";

export default () => (
  <ul>
    <li>
      <Link to="/home">Home</Link>
    </li>
    <li>
      <Link to="/search">Search</Link>
    </li>
    <li>
      <Link to="/terms">Terms</Link>
    </li>
    <li>
      <Link to="/example">Example</Link>
    </li>
  </ul>
);
