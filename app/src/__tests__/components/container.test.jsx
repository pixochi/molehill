import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import 'jest-styled-components';

import Container, {StyledContainer} from 'app/components/container';
import Theme from 'app/components/styleguide/theme';

describe('Container', () => {

  it('should render Container', () => {
    const wrapper = shallow(<Container />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render StyledContainer', () => {
    const wrapper = renderer.create(<StyledContainer theme={Theme} />).toJSON();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('background-color', Theme.background);
  });

});
