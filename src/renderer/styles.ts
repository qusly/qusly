import { css } from 'styled-components';

import { body2 } from '~/renderer/mixins';
import { fonts } from './constants';

export const Style = css`
  body {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    cursor: default;
    overflow: hidden;
    user-select: none;
    background-color: white;
    -webkit-app-region: drag;
    ${body2()};
  }

  * {
    box-sizing: border-box;
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: url(${fonts.robotoLight}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(${fonts.robotoRegular}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url(${fonts.robotoMedium}) format('woff2');
  }
`;
