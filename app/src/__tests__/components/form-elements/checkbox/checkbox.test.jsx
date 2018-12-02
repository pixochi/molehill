import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import 'jest-styled-components';

import Checkbox, {VisualCheckbox, ActualCheckbox, CheckboxContainer} from 'app/components/form-elements/checkbox/checkbox';
import Theme from 'app/components/styleguide/theme';

describe('Checkbox', () => {

  it('should render Checkbox', () => {
    const wrapper = shallow(<Checkbox />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render VisualCheckbox', () => {
    const wrapper = renderer.create(<VisualCheckbox theme={Theme} />).toJSON();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('border', `2px solid ${Theme.border.default}`);
    expect(wrapper).toHaveStyleRule('background', Theme.invertedText);
  });

  it('should render ActualCheckbox', () => {
    const wrapper = renderer.create(<ActualCheckbox theme={Theme} />).toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render CheckboxContainer', () => {
    const wrapper = renderer.create(<CheckboxContainer/>).toJSON();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('position', 'relative');
  });

});
