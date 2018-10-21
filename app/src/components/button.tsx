import React from 'react';
import styled from 'styled-components';
import { styledTS } from './styled-components';
import { ITheme } from './styled-components/theme';

const getBackgroundColor = (theme: ITheme, appearance?: keyof typeof IButtonAppearance): string => {
  switch(appearance) {
    case 'submit': 
      return theme.submit;
    default: 
      return 'grey';
  }
};

const getTextColor = (theme: ITheme, appearance?: keyof typeof IButtonAppearance): string => {
  switch(appearance) {
    case 'submit': 
      return theme.invertedText;
    default: 
      return 'grey';
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

  &:hover {
    box-shadow: 0 2px 2px ${props => props.theme.shadow};
  }
`;

enum IButtonAppearance {
  submit = 'submit',
}

interface IButtonProps {
  appearance?: keyof typeof IButtonAppearance;
  fullWidth?: boolean;
}

type Props = IButtonProps & Partial<HTMLButtonElement>;

const Button: React.SFC<Props> = (props) => {

  return (
    <StyledButton {...props}>
      Log in
    </StyledButton>
  )
}

export default Button;