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

  paddingTop?: Spacing;
  paddingBottom?: Spacing;
  paddingLeft?: Spacing;
  paddingRight?: Spacing;
  padding?: Spacing;

  clickable?: boolean;

  grow?: StandardLonghandProperties['flexGrow'];
}

type BasePropsWithTheme<T = {}> = ThemedOuterStyledProps<IBaseLayoutProps & DOMAttributes<any> & T, ITheme>;

export const Base = styled.div<BasePropsWithTheme>`
  margin-top: ${props => props.marginTop || props.margin};
  margin-bottom: ${props => props.marginBottom || props.margin};
  margin-left: ${props => props.marginLeft || props.margin};
  margin-right: ${props => props.marginRight || props.margin};

  padding-top: ${props => props.paddingTop || props.padding};
  padding-bottom: ${props => props.paddingBottom || props.padding};
  padding-left: ${props => props.paddingLeft || props.padding};
  padding-right: ${props => props.paddingRight || props.padding};

  flex-grow: ${props => props.grow};

  cursor: ${props => props.clickable ? 'pointer' : ''};
`;

interface IFlexProps {
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
