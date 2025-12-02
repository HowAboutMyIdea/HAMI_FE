"use client";

import { Global, css } from "@emotion/react";

const GlobalStyle = () => (
  <Global
    styles={css`
      @font-face {
        font-family: 'KoPubBatang';
        src: url('https://cdn.jsdelivr.net/npm/kopubfont@1.0/korean/KoPubBatang-Bold.woff2')
          format('woff2');
        font-weight: 700;
        font-style: normal;
      }

      *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'KoPubBatang', serif;
        font-weight: 700;
      }

      html,
      body {
        height: 100vh;
        background:
          linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
          url("/BG.gif");
        color: #fafafa;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        overflow-y: hidden;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      #nprogress .bar {
        background: #364155 !important;
        height: 3px !important;
      }

      #nprogress .peg {
        box-shadow: 0 0 10px rgba(54, 65, 85, 0.6),
          0 0 5px rgba(54, 65, 85, 0.6) !important;
      }

      .bn-container .bn-editor {
        max-width: 100% !important;
      }

      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }

      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `}
  />
);

export default GlobalStyle;