import React, { ButtonHTMLAttributes } from 'react';

import { ITheme } from './styleguide/theme';
import styled, { css } from 'app/components/styleguide';

import Spinner from 'app/components/spinner';
import {Body} from 'app/components/styleguide/text';

type ButtonSize = 'big' | 'mini' | 'default';

const getBackgroundColor = (theme: ITheme, appearance?: keyof typeof IButtonAppearance): string => {
  switch (appearance) {
    case 'submit':
      return theme.submit;
    case 'info':
      return theme.info;
    case 'neutral':
      return theme.textDisabled;
    default:
      return 'transparent';
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

const getPadding = (buttonSize?: ButtonSize): string => {
  switch (buttonSize) {
    case 'mini':
      return '8px 12px';
    case 'default':
    default:
      return '12px 16px';
  }
};

const getFontSize = (buttonSize?: ButtonSize): string => {
  switch (buttonSize) {
    case 'mini':
      return '14px';
    case 'big':
      return '20px';
    case 'default':
    default:
      return '16px';
  }
};

const getSpinnerPosition = (buttonSize?: ButtonSize): string => {
  switch (buttonSize) {
    case 'mini':
      return 'left: 43%; top: 20%;';
    case 'default':
    default:
    return 'left: 50%; top: 20%;';
  }
};

const StyledButton = styled.button<IButtonProps>`
  background-color: ${props => getBackgroundColor(props.theme, props.appearance)};
  padding: ${props => getPadding(props.buttonSize)};
  border-radius: 7px;
  border: none;
  cursor: pointer;
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  transition: all .2s;
  box-shadow: 0 2px 2px ${props => props.theme.shadow};
  display: block;
  position: relative;

  ${props => props.alignWith && css`
    ${props => {
      switch (props.alignWith) {
        case 'left': return 'margin-right: auto';
        case 'right': return 'margin-left: auto';
        case 'center': return 'margin: 0 auto';
        default: return 'auto';
      }
    }}
  `}

  &:hover {
    filter: brightness(98%);
  }

  &:active {
    box-shadow: none;
    filter: brightness(96%);
    transform: scale(0.99);
  }

  & > * {
    opacity: ${props => props.loading ? 0 : 1};
  }

  & > ${Body} {
    color: ${props => getTextColor(props.theme, props.appearance)};
    font-size:${props => getFontSize(props.buttonSize)};
  }
`;

const StyledSpinner = styled(Spinner).attrs<IButtonProps>({
  color: (props: any) => props.theme.invertedText,
})`
  opacity: 1 !important;
  position: absolute;
  z-index: 2;
  ${props => getSpinnerPosition(props.buttonSize)};
`;

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
  alignWith?: 'left' | 'right' | 'center';
  buttonSize?: ButtonSize;
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
    <StyledButton {...props} disabled={loading}>
      {InnerChild}
      {loading && <StyledSpinner buttonSize={props.buttonSize} />}
    </StyledButton>
  );
};

export default Button;
