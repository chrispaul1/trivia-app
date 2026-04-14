import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /* 1. Your Vite Defaults (if you still want them) */
  :root {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    /* Inject the base colors from the current theme into CSS Variables! */
    --theme-base: ${({ theme }) => theme.baseColor};
    --theme-text: ${({ theme }) => theme.textColor};
  
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* 2. THE CRUCIAL HEIGHT FIX */
  html, body, #root {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    /* Set the absolute background of the app to a1 */
    background-color: ${({ theme }) => theme.panel.a1.backgroundColor};
    color: ${({ theme }) => theme.panel.a1.color};
    /* ... height 100%, etc ... */
  }

  /* Make sure every element inherits box-sizing! */
  *, *::before, *::after {
    box-sizing: inherit;
  }
`;