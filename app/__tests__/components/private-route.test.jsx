import React from 'react';
import { render } from 'enzyme';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import {Redirect} from 'react-router-dom';

import {PrivateRoute} from 'app/components/private-route/private-route';
import Button from 'app/components/button';

describe('Private Route', () => {
  let history;

  beforeEach(() => {
    history = createBrowserHistory();
  });

  it('should redirect if not logged in', () => {
    const wrapper = render(
      <Router history={history}>
        <PrivateRoute path="/" isLoggedIn={false} component={Button} />
      </Router>
    );

    expect(wrapper.find('button')).toHaveLength(0)
  });

});
