import React from 'react';
import { shallow } from 'enzyme';

import {FormCheckbox} from 'app/components/form-elements/checkbox/form-checkbox';

describe('FormCheckbox', () => {

  it('should render FormCheckbox', () => {
    const wrapper = shallow(<FormCheckbox />);
    expect(wrapper).toMatchSnapshot();
  });

});
