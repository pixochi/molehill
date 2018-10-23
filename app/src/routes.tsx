import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { history } from './redux/store';

import Login from './login/login';
import SignUp from './sign-up/sign-up';

const Routes: React.SFC = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={SignUp}/>
    </Switch>
  </ConnectedRouter>
);

export default Routes;
