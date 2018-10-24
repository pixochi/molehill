import { createGlobalStyle  } from 'styled-components';
import { ITheme } from './styled-components/theme';

interface IProps {
  theme: ITheme;
}

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: none;
  }

  *:focus {
    outline: none;
  }

  body {
    background-color: ${(props: IProps) => props.theme.background};
    color: ${props => props.theme.text};
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
