import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer, { IRootState } from './root-reducer';
import rootEpic from 'app/root-epic';
import { LoginState } from 'app/login/reducer';
import { getUserIdFromLocalStorage } from 'app/login/helpers';
import { IReduxAction } from './create-actions';

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore<IRootState, IReduxAction<any>, {}, {}>(
  connectRouter(history)(rootReducer),
  {
    login: new LoginState({
      user: {
        id: getUserIdFromLocalStorage(),
      },
    }),
  },
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      epicMiddleware,
    ),
  ),
);

epicMiddleware.run(rootEpic);

export default store;
