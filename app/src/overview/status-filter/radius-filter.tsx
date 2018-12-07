import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import 'rc-slider/assets/index.css';
import Slider, { Handle } from 'rc-slider';
import Tooltip from 'rc-tooltip';

import { IRootState } from 'app/redux/root-reducer';
import styled from 'app/components/styleguide';
import { s3 } from 'app/components/styleguide/spacing';

import { Body } from 'app/components/styleguide/text';

import { getRadius } from '../selectors';
import { changeRadius } from '../actions';
import { RADIUS_MIN, RADIUS_MAX } from '../constants';
import Container from 'app/components/container';

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
    <Container noPadding direction="column" grow={1} marginRight={s3}>
      <Body>within {radius}&nbsp;km</Body>
      <StyledSlider
        min={RADIUS_MIN}
        max={RADIUS_MAX}
        value={radius}
        handle={handle}
        onChange={(value) => changeRadius.dispatch(value, true)}
      />
    </Container>
  );
};

export default compose(
  connect<IStateProps, {}, {}, IRootState>((state) => ({
    radius: getRadius(state),
  })),
)(RadiusFilter);
