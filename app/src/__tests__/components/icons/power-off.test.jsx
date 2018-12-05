import React from 'react';
import { shallow } from 'enzyme';

import PowerOff from 'app/components/icons/power-off';

describe('PowerOff', () => {

  it('should render PowerOff', () => {
    const wrapper = shallow(<PowerOff />);
    expect(wrapper).toMatchSnapshot();
  });

});
