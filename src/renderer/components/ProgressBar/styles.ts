import styled from 'styled-components';

import { PRIMARY_COLOR } from '~/renderer/constants';

export const StyledProgressBar = styled.div`
  width: 240px;
  height: 4px;
  position: relative;
  margin: 64px;
`;

export const StyledTrack = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${PRIMARY_COLOR};
  opacity: 0.24;
`;

export const StyledIndicator = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: ${PRIMARY_COLOR};
`;
