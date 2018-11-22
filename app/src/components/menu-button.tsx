import React from 'react';
import onClickOutside from 'react-onclickoutside';

import styled from './styleguide';
import { s3, s4 } from './styleguide/spacing';

import { Flex, Base } from './styleguide/layout';
import {Title, Body} from 'app/components/styleguide/text';
import Container from './container';

const MenuButtonContainer = styled(Flex).attrs<IMenuButtonProps>({
  justify: 'center',
  align: 'center',
  clickable: true,
})`
  border: ${props => props.bordered ? `1px solid ${props.theme.border.focus}` : 'none'};
  border-radius: 7px;
  padding: 6px 8px;
  position: relative;
`;

const ButtonContent = styled(Title).attrs({
  emphasized: true,
})`
  position: relative;
  bottom: 5px;
  font-weight: 900;
  color: ${props => props.theme.textDisabled};
  font-size: 24px;

  &:hover {
    color: ${props => props.theme.text};
  }
`;

const OptionsContainer = styled(Container).attrs({
  direction: 'column',
  withShadow: true,
  noPadding: true,
})`
  position: absolute;
  top: 40px;
  right: 0;
  z-index: 2;
  border-radius: 3px;
`;

const Option = styled(Base)`
  border-bottom: 1px solid ${props => props.theme.border.default};
`;

export interface IMenuOption {
  title: string;
  onClick: () => void;
}

interface IMenuButtonProps {
  options: IMenuOption[];
  bordered?: boolean;
  isOpen?: boolean;
}

interface IMenuButtonState {
  isOpen: boolean;
}

class MenuButton extends React.Component<IMenuButtonProps, IMenuButtonState> {

  constructor(props: IMenuButtonProps) {
    super(props);
    this.state = {
      isOpen: props.isOpen as boolean,
    };
    this.toggleOpenState = this.toggleOpenState.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  public render() {
    const {
      options,
    } = this.props;
    return (
      <MenuButtonContainer {...this.props}>
        <ButtonContent onClick={this.toggleOpenState}>...</ButtonContent>
        {this.state.isOpen && (
          <OptionsContainer>
            {options.map(option => (
              <Option
                key={option.title}
                paddingVertical={s3}
                paddingHorizontal={s4}
                onClick={option.onClick}
              >
                <Body>{option.title}</Body>
              </Option>
            ))}
          </OptionsContainer>
        )}
      </MenuButtonContainer>
    );
  }

  private toggleOpenState() {
    this.setState({isOpen: !this.state.isOpen});
  }

  private handleClickOutside = (evt: Event) => {
    this.setState({isOpen: false});
  }
}

export default onClickOutside(MenuButton);
