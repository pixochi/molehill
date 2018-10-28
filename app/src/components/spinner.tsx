import React from 'react';
import styled, {keyframes} from 'styled-components';

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

const SpinnerSVG = styled.svg`
  animation: ${rotate} 2s linear infinite;
  z-index: 2;
  width: 24px;
  height: 24px;
`;

const Circle = styled.circle`
  stroke: ${props => props.theme.invertedText};
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
  stroke-width: 2px;
`;

const Spinner = () => {
  return (
    <SpinnerSVG viewBox="0 0 24 24">
      <Circle cx="12" cy="12 " r="11" fill="none" />
    </SpinnerSVG>
  );
};

export default Spinner;
