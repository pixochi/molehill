import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { history } from './redux/store';
import styled from './components/styleguide';

import PrivateRoute from 'app/components/private-route/private-route';

import Login from './login/login';
import Overview from './overview/overview';
import SignUp from './sign-up/sign-up';
import UserProfile from './user-profile/user-profile';
import Navbar, { NAVBAR_HEIGHT_PX } from './components/navbar';

const RoutesContainer = styled.div`
  padding-top: ${NAVBAR_HEIGHT_PX};
`;

const Routes: React.SFC = () => (
  <ConnectedRouter history={history}>
    <>
      <Navbar />
      <RoutesContainer>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <PrivateRoute path="/overview" component={Overview} />
          <PrivateRoute path="/users/:userId" component={UserProfile} />
        </Switch>
      </RoutesContainer>
    </>
  </ConnectedRouter>
);

export default Routes;
