import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';

import rootReducer from './root-reducer';

export const history = createBrowserHistory();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  connectRouter(history)(rootReducer),
  {},
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
    ),
  ),
);
