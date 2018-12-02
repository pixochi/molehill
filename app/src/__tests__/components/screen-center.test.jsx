import React from 'react';
import { shallow } from 'enzyme';
import {Redirect} from 'react-router-dom';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import ScreenCenter from 'app/components/screen-center';

describe('Screen Center', () => {

  it('should render Screen Center', () => {
    const wrapper = shallow(<ScreenCenter />);
    expect(wrapper).toMatchSnapshot();
  });

});
