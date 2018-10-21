import { ConnectedRouter } from 'connected-react-router'
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { history } from './redux/store';

import Login from './login/login';

const Routes: React.SFC = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact={true} path="/" component={Login}/>
    </Switch>
  </ConnectedRouter>
)

export default Routes;