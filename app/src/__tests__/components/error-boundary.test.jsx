import React from 'react';
import { shallow } from 'enzyme';

import ErrorBoundary from 'app/components/error-boundary/error-boundary';

describe('ErrorBoundary', () => {

  it('should render ErrorBoundary', () => {
    const wrapper = shallow(<ErrorBoundary />);
    expect(wrapper).toMatchSnapshot();
  });

});
