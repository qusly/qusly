import styled from 'styled-components';

import { TOOLBAR_HEIGHT } from '~/renderer/constants';

export const StyledToolbar = styled.div`
  width: 100%;
  height: ${TOOLBAR_HEIGHT}px;
  display: flex;
  flex-flow: row;
  position: relative;
  -webkit-app-region: drag;
`;
