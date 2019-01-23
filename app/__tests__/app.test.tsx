import React from 'react';
import ReactDOM from 'react-dom';

import App from '../src/app';

describe('App', () => {
  it(' should render the app without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
