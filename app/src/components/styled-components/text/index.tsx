import styled, { ThemedOuterStyledProps } from 'styled-components';

import { styledTS } from 'app/components/styled-components';
import {Base as BaseLayout, IBaseLayoutProps} from 'app/components/styled-components/layout';
import { ITheme } from 'app/components/styled-components/theme';

interface IBaseTextProps {
  textAlign?: 'left' | 'right' | 'center' | 'justify';
}

type BaseProps = IBaseTextProps & IBaseLayoutProps;

const BaseText = styledTS<ThemedOuterStyledProps<BaseProps, ITheme>>()<ITheme>(styled(BaseLayout))`
  text-align: ${props => props.textAlign};
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

export const Body = styled(BaseText).attrs({
  as: 'p',
})`
  font-size: 16px;
`;
