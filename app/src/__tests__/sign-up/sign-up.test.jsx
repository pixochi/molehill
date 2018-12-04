import React from 'react';
import { shallow } from 'enzyme';

import {SignUp} from 'app/sign-up/sign-up';

describe('Sign Up', () => {

  it('should render SignUp', () => {
    const wrapper = shallow(<SignUp />);
    expect(wrapper).toMatchSnapshot();
  });

});
