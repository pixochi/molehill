import React from 'react';
import { shallow } from 'enzyme';

import {LoginForm} from 'app/login/form';

describe('LoginForm', () => {

  it('should render LoginForm', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper).toMatchSnapshot();
  });

});
