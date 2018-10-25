import styled, { ThemedOuterStyledProps } from 'styled-components';

import { styledTS } from 'app/components/styled-components';
import {Spacing} from 'app/components/styled-components/spacing';
import { ITheme } from 'app/components/styled-components/theme';

export interface IBaseLayoutProps {
  marginTop?: Spacing;
}

export const Base = styledTS<ThemedOuterStyledProps<IBaseLayoutProps, ITheme>>()<ITheme>(styled.div)`
  margin-top: ${props => props.marginTop};
`;
