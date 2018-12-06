import React from 'react';
import { shallow } from 'enzyme';

import {StatusItem} from 'app/overview/status-list/status-item';
import withStateMutation from 'app/components/higher-order/with-state-mutation';

describe('withStateMutation', () => {

  it('should render withStateMutation', () => {
    const WithStateMutationElement = withStateMutation()(StatusItem);
    const wrapper = shallow(<WithStateMutationElement mutate={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });

});
