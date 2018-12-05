import React from 'react';
import { shallow } from 'enzyme';

import {Login} from 'app/login/login';

describe('Login', () => {

  it('should render Login', () => {
    const wrapper = shallow(<Login sMutation={{loading: false}} />);
    expect(wrapper).toMatchSnapshot();
  });

});
