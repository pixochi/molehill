import React, {Component} from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'react-redux';
import {ThemeProvider} from 'styled-components';

import theme from 'app/components/styled-components/theme';
import store from './redux/store';

import GlobalCSS from 'app/components/global-css';
import client from './graphql-client';
import Routes from './routes';

class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <>
                <GlobalCSS theme={theme} />
                <Routes />
            </>
          </ThemeProvider>
        </ApolloProvider>
      </Provider>

    );
  }
}

export default App;
