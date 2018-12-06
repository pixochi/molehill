import React from 'react';
import renderer from 'react-test-renderer'
import 'jest-styled-components';

import Svg from 'app/components/svg';

describe('Svg', () => {

  it('should render Svg with size', () => {
    const wrapper = renderer.create(<Svg size={10} />).toJSON();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('width', '10px');
    expect(wrapper).toHaveStyleRule('min-width', '10px');
    expect(wrapper).toHaveStyleRule('height', '10px');
    expect(wrapper).toHaveStyleRule('min-height', '10px');
  });

  it('should render Svg with width and height', () => {
    const wrapper = renderer.create(<Svg width={5} height={2} />).toJSON();
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveStyleRule('width', '5px');
    expect(wrapper).toHaveStyleRule('min-width', '5px');
    expect(wrapper).toHaveStyleRule('height', '2px');
    expect(wrapper).toHaveStyleRule('min-height', '2px');
  });
});
