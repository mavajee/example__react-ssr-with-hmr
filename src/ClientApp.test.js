import React from 'react';
import ReactDOM from 'react-dom';
import ClientApp from './ClientApp';

it('renders without crashing', () => {
  const div = document.createElement('div');

  ReactDOM.render(<ClientApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
