import { css } from 'styled-components';
import { body2 } from '../mixins/typography';

export const Style = css`
  body {
    width: 100vw;
    height: 100vh;
    user-select: none;
    cursor: default;
    margin: 0;
    padding: 0;
    overflow: hidden;
    ${body2()};
  }

  * {
    box-sizing: border-box;
  }
`;
