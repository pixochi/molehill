import styled, { ThemedOuterStyledProps } from 'styled-components';
import { FlexDirectionProperty, ContentPosition } from 'csstype';

import { styledTS } from 'app/components/styled-components';
import {Spacing} from 'app/components/styled-components/spacing';
import { ITheme } from 'app/components/styled-components/theme';
import { DOMAttributes } from 'react';

export interface IBaseLayoutProps {
  marginTop?: Spacing;
  marginBottom?: Spacing;
  marginLeft?: Spacing;
  marginRight?: Spacing;
  margin?: Spacing;

  paddingTop?: Spacing;
  paddingBottom?: Spacing;
  paddingLeft?: Spacing;
  paddingRight?: Spacing;
  padding?: Spacing;

  clickable?: boolean;
}

type BasePropsWithTheme<T = {}> = ThemedOuterStyledProps<IBaseLayoutProps & DOMAttributes<any> & T, ITheme>;

export const Base = styledTS<BasePropsWithTheme>()(styled.div)`
  margin-top: ${props => props.marginTop || props.margin};
  margin-bottom: ${props => props.marginBottom || props.margin};
  margin-left: ${props => props.marginLeft || props.margin};
  margin-right: ${props => props.marginRight || props.margin};

  padding-top: ${props => props.paddingTop || props.padding};
  padding-bottom: ${props => props.paddingBottom || props.padding};
  padding-left: ${props => props.paddingLeft || props.padding};
  padding-right: ${props => props.paddingRight || props.padding};

  cursor: ${props => props.clickable ? 'pointer' : ''};
`;

interface IFlexProps {
  direction?: FlexDirectionProperty;
  justify?: ContentPosition;
  align?: ContentPosition;
}

export const Flex =  styledTS<BasePropsWithTheme<IFlexProps>>()(styled(Base))`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
`;
