import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { history } from './redux/store';

// import PrivateRoute from 'app/components/private-route/private-route';
import Login from './login/login';
import Overview from './overview/overview';
import SignUp from './sign-up/sign-up';

const Routes: React.SFC = () => (
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route path="/signup" component={SignUp}/>
      <Route path="/overview" component={Overview} />
    </Switch>
  </ConnectedRouter>
);

export default Routes;
