import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux';

import rootReducer from './root-reducer';

export const history = createBrowserHistory()

export default createStore(
  connectRouter(history)(rootReducer),
  {},
  compose(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
);
