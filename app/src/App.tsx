import React, {Component} from 'react';
import { Provider } from 'react-redux';
import {ThemeProvider} from 'styled-components';

import theme from 'app/components/styled-components/theme';
import store from './redux/store';

import GlobalCSS from 'app/components/global-css';
import Routes from './routes';

class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <>
              <GlobalCSS />
              <Routes />
          </>
        </ThemeProvider>
      </Provider>

    );
  }
}

export default App;
