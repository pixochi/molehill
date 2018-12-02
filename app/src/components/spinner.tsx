import React from 'react';
import styled, {keyframes} from 'styled-components';

import { Flex } from './styleguide/layout';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 75;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 45, 75;
    stroke-dashoffset: -17;
  }
  100% {
    stroke-dasharray: 45, 75;
    stroke-dashoffset: -62;
  }
`;

interface ISpinnerSVGProps {
  margined?: boolean;
  className?: string;
}

export const SpinnerSVG = styled.svg<ISpinnerSVGProps>`
  animation: ${rotate} 2s linear infinite;
  z-index: 2;
  width: 20px;
  height: 20px;
  margin: ${props => props.margined ? '16px' : 0};
`;

export const Circle = styled.circle`
  stroke: ${props => props.color ? props.color : props.theme.text};
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
  stroke-width: 2px;
`;

const StyledFlex = styled(Flex).attrs({
  justify: 'center',
})``;

interface ISpinnerProps {
  color?: string;
  centered?: boolean;
  margined?: boolean;
  className?: string;
}

const Spinner: React.SFC<ISpinnerProps> = (props) => {

  const {
    centered,
    margined,
    color,
    className,
  } = props;

  const Container = centered ? StyledFlex : React.Fragment;

  return (
    <Container>
      <SpinnerSVG viewBox="0 0 24 24" margined={margined} className={className}>
        <Circle color={color} cx="12" cy="12 " r="11" fill="none" />
      </SpinnerSVG>
    </Container>
  );
};

export default Spinner;
