import { css } from 'styled-components';

import { robotoRegular } from './typography';

export const customInput = () => {
  return css`
    border: none;
    outline: none;
    resize: none;
    user-select: auto;
    ${robotoRegular()};
  `;
}
