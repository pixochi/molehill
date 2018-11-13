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
      return theme.backgroundDarker;
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
  border-radius: 7px;
  border: none;
  cursor: pointer;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  transition: all .2s;
  box-shadow: 0 2px 2px ${props => props.theme.shadow};

  &:hover {
    filter: brightness(98%);
  }

  &:active {
    box-shadow: none;
    filter: brightness(96%);
    transform: scale(0.99);
  }

  & > ${Body} {
    color: ${props => getTextColor(props.theme, props.appearance)};
    font-size: 20px;
  }
`;

const StyledSpinner = styled(Spinner).attrs({
  color: (props: any) => props.theme.invertedText,
})``;

enum IButtonAppearance {
  submit = 'submit',
  info = 'info',
  neutral = 'neutral',
}

interface IButtonProps {
  text?: string;
  appearance?: keyof typeof IButtonAppearance;
  fullWidth?: boolean;
  loading?: boolean;
}

type Props = IButtonProps & Partial<ButtonHTMLAttributes<any>>;

const Button: React.SFC<Props> = (props) => {

  const {
    loading,
    children,
  } = props;

  const InnerChild = children ? children : (
    <Body>{props.text}</Body>
  );

  return (
    <StyledButton {...props}>
      {loading ?  <StyledSpinner /> : InnerChild}
    </StyledButton>
  );
};

export default Button;
