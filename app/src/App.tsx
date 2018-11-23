import React, {Component} from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import {ThemeProvider} from 'styled-components';

import theme from 'app/components/styleguide/theme';
import store from './redux/store';
import client from './graphql-client';

import GlobalCSS from 'app/components/global-css';
import Routes from './routes';
import ErrorBoundary from './components/error-boundary/error-boundary';
import Portal from './components/portal/portal';
import GlobalEvent from './components/global-event/global-event';
import ConfirmDialog from './components/confirm-dialog/confirm-dialog';

class App extends Component {
  public render() {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <ApolloProvider client={client}>
            <ThemeProvider theme={theme}>
              <>
                  <GlobalCSS theme={theme} />
                  <Portal id="global-event">
                    <GlobalEvent />
                  </Portal>
                  <Portal id="confirm-dialog">
                    <ConfirmDialog />
                  </Portal>
                  <Routes />
              </>
            </ThemeProvider>
          </ApolloProvider>
        </Provider>
      </ErrorBoundary>

    );
  }
}

export default App;
