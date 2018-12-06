import React from 'react';
import { shallow } from 'enzyme';

import {SignUp} from 'app/sign-up/sign-up';

describe('Sign Up', () => {

  it('should render SignUp if user is logged in', () => {
    const wrapper = shallow(<SignUp isLoggedIn={false} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Redirect if user is not logged in', () => {
    const wrapper = shallow(<SignUp isLoggedIn />);
    expect(wrapper).toMatchSnapshot();
  });

});
