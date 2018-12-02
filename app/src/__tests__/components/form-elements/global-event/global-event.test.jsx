import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import 'jest-styled-components';

import {GlobalEvent, ActualCheckbox, CheckboxContainer} from 'app/components/global-event/global-event';
import Theme from 'app/components/styleguide/theme';

describe('GlobalEvent', () => {

  it('should render GlobalEvent', () => {
    const wrapper = shallow(<GlobalEvent />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render GlobalEventContainer', () => {
    const wrapper = renderer.create(<GlobalEventContainer theme={Theme} />).toJSON();
    expect(wrapper).toMatchSnapshot();
    // expect(wrapper).toHaveStyleRule('border', `2px solid ${Theme.border.default}`);
    // expect(wrapper).toHaveStyleRule('background', Theme.invertedText);
  });

});
