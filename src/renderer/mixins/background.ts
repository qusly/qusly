import { css } from 'styled-components';

import { CARD_SHADOW } from '../app/constants';

export const blurBackground = css`
  background-color: rgba(0, 0, 0, 0.02);
  backdrop-filter: blur(32px);
  box-shadow: ${CARD_SHADOW};
`;
