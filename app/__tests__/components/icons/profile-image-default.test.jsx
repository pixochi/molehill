import React from 'react';
import { shallow } from 'enzyme';

import ProfileImageDefault from 'app/components/icons/profile-image-default';

describe('ProfileImageDefault', () => {

  it('should render ProfileImageDefault', () => {
    const wrapper = shallow(<ProfileImageDefault />);
    expect(wrapper).toMatchSnapshot();
  });

});
