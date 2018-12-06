import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer'
import 'jest-styled-components';

import {GlobalEvent, GlobalEventContainer, DismissButton} from 'app/components/global-event/global-event';
import { GlobaEventType } from 'app/components/global-event/constants';
import Theme from 'app/components/styleguide/theme';

describe('GlobalEvent', () => {

  it('should render GlobalEvent', () => {
    const mockGlobalEvent = {
      message: 'Mock Global Event',
      type: GlobaEventType.SUCCESS,
      sticky: false,
    };
    const wrapper = shallow(<GlobalEvent globalEvent={mockGlobalEvent} />);
    expect(wrapper).toMatchSnapshot();
  });

  it(`should not render GlobalEvent if event doesn't contain type`, () => {
    const mockGlobalEvent = {
      message: 'Mock Global Event',
      sticky: false,
    };
    const wrapper = shallow(<GlobalEvent globalEvent={mockGlobalEvent} />);
    expect(wrapper).toMatchSnapshot();
  });

  it(`should not render GlobalEvent if event doesn't contain message`, () => {
    const mockGlobalEvent = {
      sticky: false,
      type: GlobaEventType.SUCCESS,
    };
    const wrapper = shallow(<GlobalEvent globalEvent={mockGlobalEvent} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Success GlobalEventContainer', () => {
    const wrapper = renderer.create(<GlobalEventContainer theme={Theme} eventType={GlobaEventType.SUCCESS} />).toJSON();
    expect(wrapper).toHaveStyleRule('background', `linear-gradient(to bottom right,${Theme.submitLight},${Theme.submitDark})`);
  });

  it('should render Error GlobalEventContainer', () => {
    const wrapper = renderer.create(<GlobalEventContainer theme={Theme} eventType={GlobaEventType.ERROR} />).toJSON();
    expect(wrapper).toHaveStyleRule('background', `linear-gradient(to bottom right,${Theme.errorLight},${Theme.errorDark})`);
  });

  it('should render default GlobalEventContainer', () => {
    const wrapper = renderer.create(<GlobalEventContainer theme={Theme} />).toJSON();
    expect(wrapper).toHaveStyleRule('background', undefined);
  });
  
  it('should render DismissButton', () => {
    const wrapper = shallow(<DismissButton />);
    expect(wrapper).toMatchSnapshot();
  });

});
