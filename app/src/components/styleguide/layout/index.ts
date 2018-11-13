import { ThemedOuterStyledProps } from 'styled-components';
import {
  FlexDirectionProperty,
  StandardLonghandProperties,
  JustifyContentProperty,
  AlignContentProperty,
} from 'csstype';

import styled from 'app/components/styleguide';
import {Spacing} from 'app/components/styleguide/spacing';
import { ITheme } from 'app/components/styleguide/theme';
import { DOMAttributes } from 'react';

export interface IBaseLayoutProps {
  marginTop?: Spacing;
  marginBottom?: Spacing;
  marginLeft?: Spacing;
  marginRight?: Spacing;
  margin?: Spacing;
  marginVertical?: Spacing;
  marginHorizontal?: Spacing;

  paddingTop?: Spacing;
  paddingBottom?: Spacing;
  paddingLeft?: Spacing;
  paddingRight?: Spacing;
  padding?: Spacing;
  paddingVertical?: Spacing;
  paddingHorizontal?: Spacing;

  clickable?: boolean;

  grow?: StandardLonghandProperties['flexGrow'];
}

type BasePropsWithTheme<T = {}> = ThemedOuterStyledProps<IBaseLayoutProps & DOMAttributes<any> & T, ITheme>;

export const Base = styled.div<BasePropsWithTheme>`
  margin-top: ${props => props.marginTop || props.marginVertical || props.margin};
  margin-bottom: ${props => props.marginBottom || props.marginVertical || props.margin};
  margin-left: ${props => props.marginLeft || props.marginHorizontal || props.margin };
  margin-right: ${props => props.marginRight || props.marginHorizontal || props.margin};

  padding-top: ${props => props.paddingTop || props.paddingVertical || props.padding};
  padding-bottom: ${props => props.paddingBottom || props.paddingVertical || props.padding};
  padding-left: ${props => props.paddingLeft || props.paddingHorizontal || props.padding};
  padding-right: ${props => props.paddingRight || props.paddingHorizontal || props.padding};

  flex-grow: ${props => props.grow};

  cursor: ${props => props.clickable ? 'pointer' : ''};
`;

export interface IFlexProps {
  direction?: FlexDirectionProperty;
  justify?: JustifyContentProperty;
  align?: AlignContentProperty;
}

export const Flex =  styled(Base)<BasePropsWithTheme<IFlexProps>>`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: ${props => props.justify};
  align-items: ${props => props.align};
`;
