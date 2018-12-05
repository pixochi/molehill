import React from 'react';
import { shallow } from 'enzyme';

import {SignUpForm, validate} from 'app/sign-up/form';

describe('SignUpForm', () => {

  it('should render SignUpForm', () => {
    const wrapper = shallow(<SignUpForm />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should return empty errors if form data is valid', () => {
    const formData = {
      password: 'secret',
      passwordRepeat: 'secret',
    };
    const errors = validate(formData);

    expect(errors).toEqual({});
  });

  it('should return errors if form data is invalid', () => {
    const formData = {
      password: 'secret',
      passwordRepeat: 'different pass',
    };
    const errors = validate(formData);
    const expectedErrors = {
      passwordRepeat: `Those passwords didn't match. Try again.`,
    };

    expect(expectedErrors).toEqual(errors);
  });

});
