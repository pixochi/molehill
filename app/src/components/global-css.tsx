import { createGlobalStyle  } from 'styled-components';
import 'typeface-roboto';

import { ITheme } from './styleguide/theme';

interface IProps {
  theme: ITheme;
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
    font-family: 'Roboto',sans-serif;
  }

  *:focus {
    outline: none;
  }

  body {
    background-color: ${(props: IProps) => props.theme.background};
    color: ${props => props.theme.text};
    font-family: 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
