import React from 'react';
import { shallow } from 'enzyme';

import genericFormElement from 'app/components/form-elements/generic-form-element';
import {FormInput} from 'app/components/form-elements/form-input';

describe('GenericFormElement', () => {

  it('should render GenericFormElement', () => {
    const GenericFormElement = genericFormElement(FormInput);
    const wrapper = shallow(<GenericFormElement meta={{}} />);
    expect(wrapper).toMatchSnapshot();
  });

});
