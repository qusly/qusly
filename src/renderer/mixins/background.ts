import { css } from 'styled-components';

import { CARD_SHADOW } from '../app/constants';

export const blurBackground = css`
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  box-shadow: ${CARD_SHADOW};
`;
