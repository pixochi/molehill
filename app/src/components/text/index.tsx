import React from 'react';
import styled from 'styled-components';

import { styledTS } from '../styled-components';
import { ITheme } from '../styled-components/theme';

interface IBaseTextProps {
  textAlign?: 'left' | 'right' | 'center' | 'justify';
}

const BaseText = styledTS<IBaseTextProps>()<ITheme>(styled.span)`
  text-align: ${props => props.textAlign};
`;

const HeadlineStyled = styled(BaseText)`
  font-size: 40px;
`;

export const Headline = (props: any) => {
  return <HeadlineStyled {...props} as="h1">{props.children}</HeadlineStyled>;
};

const SubHeadlineStyled = styled(BaseText)`
  font-size: 32px;
`;

export const SubHeadline = (props: any) => {
  return <SubHeadlineStyled {...props} as="h2">{props.children}</SubHeadlineStyled>;
};

const BodyStyled = styled(BaseText)`
  font-size: 16px;
`;

export const Body = (props: any) => {
  return <BodyStyled {...props} as="p">{props.children}</BodyStyled>;
};
