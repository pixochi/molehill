import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore, AnyAction } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import rootReducer, { IRootState } from './root-reducer';
import rootEpic from 'app/root-epic';
import { LoginState } from 'app/login/reducer';
import { getUserFromLocalStorage } from 'app/login/helpers';
import { IReduxAction } from './create-actions';

export const history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore<IRootState, IReduxAction<any> | AnyAction, {}, {}>(
  connectRouter(history)(rootReducer),
  {
    login: new LoginState({
      user: getUserFromLocalStorage(),
    }),
  },
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      epicMiddleware,
    ),
  ),
);

export const getStore = () => store;

epicMiddleware.run(rootEpic);

export default store;
