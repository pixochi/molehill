import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer from './root-reducer';
import rootEpic from 'app/root-epic';

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  connectRouter(history)(rootReducer),
  {},
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      epicMiddleware,
    ),
  ),
);

epicMiddleware.run(rootEpic);

export default store;
