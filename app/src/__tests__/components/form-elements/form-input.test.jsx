import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import {FormInput, StyledInput, InputContainer, ClearButton} from 'app/components/form-elements/form-input';
import Theme from 'app/components/styleguide/theme';

describe('FormInput', () => {

  it('should render FormInput', () => {
    const wrapper = shallow(<FormInput />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render StyledInput', () => {
    const wrapper = renderer.create(<StyledInput theme={Theme} />).toJSON();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('border', `1px solid ${Theme.border.default}`);
  });

  it('should render InputContainer', () => {
    const wrapper = renderer.create(<InputContainer />).toJSON();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('position', 'relative');
  });

  it('should render ClearButton', () => {
    const wrapper = renderer.create(<ClearButton />).toJSON();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('position', 'absolute');
  });

  it('should clear input on ClearButton clicked', () => {
    const clearInput = jest.fn();
    const wrapper = shallow(<ClearButton onClick={clearInput} />);
    wrapper.simulate('click');
    expect(clearInput).toHaveBeenCalled();
  });

});
