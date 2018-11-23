import React, { HTMLAttributes } from 'react';

import styled from './styleguide';
import { Flex, IFlexProps, IBaseLayoutProps } from './styleguide/layout';

const StyledContainer = styled(Flex)<IContainer>`
  background-color: ${props => props.theme.background};
  box-shadow:  ${props => props.withShadow ? `0 2px 4px ${props.theme.shadowStrong}` : 'unset'};
  padding:  ${props => props.noPadding ? 0 : `16px`};
  height: ${props => props.height ? `${props.height}px` : 'auto'};
  border-radius: ${props => props.rounded ? '7px' : 0};
`;

interface IContainer {
  height?: number;
  withShadow?: boolean;
  noPadding?: boolean;
  rounded?: boolean;
}

type Props = IFlexProps & IBaseLayoutProps & IContainer & HTMLAttributes<any>;

const Container: React.SFC<Props> = (props) => {
  return (
    <StyledContainer {...props}>
      {props.children}
    </StyledContainer>
  );
};

export default Container;
