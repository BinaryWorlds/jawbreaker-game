import React from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import theme from './theme';
import SEO from '../components/SEO';

const GlobalStyle = createGlobalStyle`

  html {
    font-size: 62.5%;
    -webkit-tap-highlight-color: transparent;
    scroll-behavior: smooth;
  }

  * {
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
    font-family: inherit;
    color: ${theme.colors.text};
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }


  *::selection {
    color: black;
    background-color: ${theme.colors.highlight};
  }
  
  body {
    font-family: ${theme.fonts.family.notoSans};
    min-width:320px;
  }
  
  button, a{
    :focus-visible {
      outline: 2px solid black;
    }
  }

  a,
  input,
  textarea,
  button,
  select{
    -webkit-tap-highlight-color: ${theme.colors.highlight};
  }
`;

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <SEO />
      <GlobalStyle />
      {children}
    </>
  </ThemeProvider>
);

export default Layout;
