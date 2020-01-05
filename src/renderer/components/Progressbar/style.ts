import styled from 'styled-components';

import { EASING_FUNCTION } from '~/renderer/app/constants';

export const StyledProgressbar = styled.div`
  width: 240px;
  height: 4px;
  position: relative;
`;

export const Line = styled.div`
  width: 100%;
  height: 100%;
  background-color: #2196F3;
  opacity: 0.38;
  position: absolute;
`;

export const Track = styled(Line)`
  opacity: 1;
  will-change: width;
  transition: 0.1s width ${EASING_FUNCTION};
`;
