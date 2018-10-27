import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { styledTS } from './styled-components';
import { ITheme } from './styled-components/theme';

const getBackgroundColor = (theme: ITheme, appearance?: keyof typeof IButtonAppearance): string => {
  switch (appearance) {
    case 'submit':
      return theme.submit;
    case 'info':
      return theme.info;
    default:
      return theme.invertedText;
  }
};

const getTextColor = (theme: ITheme, appearance?: keyof typeof IButtonAppearance): string => {
  switch (appearance) {
    case 'submit':
    case 'info':
      return theme.invertedText;
    default:
      return theme.text;
  }
};

const StyledButton = styledTS<IButtonProps>()<ITheme>(styled.button)`
  background-color: ${props => getBackgroundColor(props.theme, props.appearance)};
  color: ${props => getTextColor(props.theme, props.appearance)};
  padding: 8px 16px;
  font-size: 20px;
  border-radius: 7px;
  border: none;
  cursor: pointer;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  transition: all .2s;
  box-shadow: 0 1px 1px ${props => props.theme.shadow};

  &:hover {
    box-shadow: 0 2px 2px ${props => props.theme.shadow};
    filter: brightness(90%);
  }
`;

enum IButtonAppearance {
  submit = 'submit',
  info = 'info',
}

interface IButtonProps {
  text: string;
  appearance?: keyof typeof IButtonAppearance;
  fullWidth?: boolean;
}

type Props = IButtonProps & Partial<ButtonHTMLAttributes<any>>;

const Button: React.SFC<Props> = (props) => {

  return (
    <StyledButton {...props}>
      {props.text}
    </StyledButton>
  );
};

export default Button;
