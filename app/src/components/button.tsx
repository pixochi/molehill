import React, { ButtonHTMLAttributes } from 'react';

import { ITheme } from './styleguide/theme';
import styled from 'app/components/styleguide';

import Spinner from 'app/components/spinner';
import {Body} from 'app/components/styleguide/text';

const getBackgroundColor = (theme: ITheme, appearance?: keyof typeof IButtonAppearance): string => {
  switch (appearance) {
    case 'submit':
      return theme.submit;
    case 'info':
      return theme.info;
    case 'neutral':
      return theme.textDisabled;
    default:
      return theme.invertedText;
  }
};

const getTextColor = (theme: ITheme, appearance?: keyof typeof IButtonAppearance): string => {
  switch (appearance) {
    case 'submit':
    case 'info':
    case 'neutral':
      return theme.invertedText;
    default:
      return theme.text;
  }
};

const StyledButton = styled.button<IButtonProps>`
  background-color: ${props => getBackgroundColor(props.theme, props.appearance)};
  padding: 12px 16px;
  font-size: 20px;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  transition: all .2s;
  box-shadow: 0 1px 1px ${props => props.theme.shadow};

  &:hover {
    box-shadow: 0 2px 2px ${props => props.theme.shadow};
    filter: brightness(97%);
  }

  &:active {
    box-shadow: 0 4px 2px ${props => props.theme.shadow};
    filter: brightness(93%);
  }

  ${Body} {
    color: ${props => getTextColor(props.theme, props.appearance)};
  }
`;

enum IButtonAppearance {
  submit = 'submit',
  info = 'info',
  neutral = 'neutral',
}

interface IButtonProps {
  text: string;
  appearance?: keyof typeof IButtonAppearance;
  fullWidth?: boolean;
  loading?: boolean;
}

type Props = IButtonProps & Partial<ButtonHTMLAttributes<any>>;

const Button: React.SFC<Props> = (props) => {

  const InnerChild = props.loading ? <Spinner /> : <Body>{props.text}</Body>;

  return (
    <StyledButton {...props}>
      {InnerChild}
    </StyledButton>
  );
};

export default Button;
