import React from 'react';
import { css } from 'styled-components';


const CSS = css`
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
    background-color: ${props => props.theme.background};
  }
`;

const GlobalCSS: React.SFC = () => {

  return (
    <style>
      {CSS}
    </style>
  );
}

export default GlobalCSS;