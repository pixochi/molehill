import React from 'react';
import { shallow } from 'enzyme';

import FormField from 'app/components/form-elements/form-field';

describe('FormField', () => {

  it('should render FormField', () => {
    const wrapper = shallow(<FormField />);
    expect(wrapper).toMatchSnapshot();
  });

});
