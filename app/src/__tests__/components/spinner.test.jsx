import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import 'jest-styled-components'

import Spinner, {SpinnerSVG, Circle} from 'app/components/spinner';

describe('Spinner', () => {

  it('should render Spinner', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render SpinnerSVG with margin', () => {
    const wrapper = renderer.create(<SpinnerSVG margined />).toJSON();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('margin', '16px');
  });

  it('should render Circle with color', () => {
    const wrapper = renderer.create(<Circle color="red" />).toJSON();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('stroke', 'red');
  });

});
