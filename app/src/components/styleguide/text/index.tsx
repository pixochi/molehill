import styled, { css } from 'app/components/styleguide';
import {Base as BaseLayout, IBaseLayoutProps} from 'app/components/styleguide/layout';
import { DOMAttributes } from 'react';

interface IBaseTextProps {
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  inverted?: boolean;
  emphasized?: boolean;
  disabled?: boolean;
  inline?: boolean;
  as?: string;
  break?: boolean;
}

export type BaseProps = IBaseTextProps & IBaseLayoutProps & DOMAttributes<any>;

const BaseText = styled(BaseLayout)<BaseProps>`
  text-align: ${props => props.textAlign};
  color: ${props => props.inverted ? props.theme.invertedText : props.theme.text};
  font-weight: ${props => props.emphasized ? 600 : 400};
  opacity: ${props => props.disabled ? 0.7 : 1};
  word-break: ${props => props.break ? 'break-word' : 'unset'};

  ${props => props.inline && css`
    display: inline;
  `}
`;

export const Headline = styled(BaseText).attrs({
  as: 'h1',
})`
  font-size: 40px;
`;

export const SubHeadline = styled(BaseText).attrs({
  as: 'h2',
})`
  font-size: 32px;
`;

export const Title = styled(BaseText).attrs({
  as: 'p',
})`
  font-size: 24px;
`;

export const Body = styled(BaseText).attrs({
  as: 'p',
})`
  font-size: 16px;
  line-height: 1.3;
`;
