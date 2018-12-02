import React from 'react';
import {shallow} from 'enzyme';

import UserImage from 'app/components/user-image';

describe('User Image', () => {

  it('should render UserImage with size', () => {
    const wrapper = shallow(<UserImage imgSize={50} imgSrc="img-source" />);
    expect(wrapper).toMatchSnapshot();
  });

});
