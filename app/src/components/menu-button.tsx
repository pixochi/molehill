import React from 'react';

import styled from './styleguide';

import { Flex } from './styleguide/layout';
import {Title} from 'app/components/styleguide/text';

const MenuButtonContainer = styled(Flex).attrs({
  justify: 'center',
  align: 'center',
  clickable: true,
})`
  border: 1px solid ${props => props.theme.border.focus};
  border-radius: 7px;
  padding: 6px 8px;
`;

const ButtonContent = styled(Title).attrs({
  emphasized: true,
})`
  position: relative;
  bottom: 5px;
  letter-spacing: 1.3px;
`;

const MenuButton: React.SFC = () => {

  return (
    <MenuButtonContainer>
      <ButtonContent>...</ButtonContent>
    </MenuButtonContainer>
  );
};

export default MenuButton;
