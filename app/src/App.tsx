import { ConnectedRouter } from 'connected-react-router'
import React, {Component} from 'react';
import { Provider } from 'react-redux'

import store from './redux/store';

import Routes from './routes'

class App extends Component {
  public render() {
    return (
      <Provider store={store}>
          <Routes />
      </Provider>

    );
  }
}

export default App;
