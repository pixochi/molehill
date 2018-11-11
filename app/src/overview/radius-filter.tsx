import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import 'rc-slider/assets/index.css';
import Slider, { Handle } from 'rc-slider';
import Tooltip from 'rc-tooltip';

import { IRootState } from 'app/redux/root-reducer';
import { s5, s6 } from 'app/components/styleguide/spacing';
import styled from 'app/components/styleguide';

import { Flex } from 'app/components/styleguide/layout';
import { Body } from 'app/components/styleguide/text';

import { getRadius } from './selectors';
import { changeRadius } from './actions';
import { RADIUS_MIN, RADIUS_MAX } from './constants';

const StyledSlider = styled(Slider)`

  && > * {
    height: 12px;
  }

  & .rc-slider-track {
    background-color: ${props => props.theme.submitLight};
  }

  & .rc-slider-rail {
    background-color: ${props => props.theme.inactive};
  }

  && .rc-slider-handle {
    background: ${props => props.theme.secondary};
    border: 2px solid ${props => props.theme.border.focus};
    height: 24px;
    width: 24px;

    &:active, &:focus {
      box-shadow: 0 0 0 4px ${props => props.theme.secondaryLight};
    }
  }
`;

const handle = (props: any) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};

interface IStateProps {
  radius: number;
}

const RadiusFilter: React.SFC<IStateProps> = (props) => {

  const {
    radius,
  } = props;

  return (
    <Flex paddingVertical={s5} paddingHorizontal={s6} direction="column">
      <Body>within {radius}&nbsp;km</Body>
      <StyledSlider
        min={RADIUS_MIN}
        max={RADIUS_MAX}
        value={radius}
        handle={handle}
        onChange={(value) => changeRadius.dispatch(value, true)}
      />
    </Flex>
  );
};

export default compose(
  connect<IStateProps, {}, {}, IRootState>((state) => ({
    radius: getRadius(state),
  })),
)(RadiusFilter);
