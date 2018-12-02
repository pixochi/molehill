import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import 'jest-styled-components';

import {FormTextArea, StyledTextArea} from 'app/components/form-elements/form-text-area';
import Theme from 'app/components/styleguide/theme';

describe('FormTextArea', () => {

  it('should render FormTextArea', () => {
    const wrapper = shallow(<FormTextArea />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render StyledTextArea', () => {
    const wrapper = renderer.create(<StyledTextArea theme={Theme} />).toJSON();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('border', `1px solid ${Theme.border.default}`);
  });

});
