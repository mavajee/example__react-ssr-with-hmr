import React from 'react';
import { Route } from 'react-router';

export default function RouteWithStatusCode({ code, component, ...props }) {
  return (
    <Route
      {...props}
      render={({ staticContext }) => {
        if (staticContext) staticContext.status = code;
        return React.createElement(component);
      }}
    />
  );
}