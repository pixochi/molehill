
import styled from './styleguide';

interface ISvg {
  size?: number | string;
}

const Svg = styled.svg<ISvg>`
  width: ${({width, size}) => `${width ? width : size}px`};
  height: ${({height, size}) => `${height ? height : size}px`};
`;

export default Svg;
