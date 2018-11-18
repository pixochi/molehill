import React from 'react';

import styled from './styleguide';
import { Flex, IFlexProps, IBaseLayoutProps } from './styleguide/layout';
import { s4 } from './styleguide/spacing';

const StyledContainer = styled(Flex)<IContainer>`
  background-color: ${props => props.theme.background};
  box-shadow: 0 2px 4px ${props => props.theme.shadow};
  height: ${props => props.height ? `${props.height}px` : '100%'};
`;

interface IContainer {
  height?: number;
}

type Props = IFlexProps & IBaseLayoutProps & IContainer;

const Container: React.SFC<Props> = (props) => {
  return (
    <StyledContainer padding={s4} {...props}>
      {props.children}
    </StyledContainer>
  );
};

export default Container;
