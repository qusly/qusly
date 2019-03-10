import styled from 'styled-components';

import {
  transparency,
  TOOLBAR_HEIGHT,
  PATHVIEW_HEIGHT,
} from '~/renderer/constants';

export const StyledAppBar = styled.div`
  width: 100vw;
  border-bottom: 1px solid rgba(0, 0, 0, ${transparency.dividers});
`;

export const StyledPathView = styled.div`
  width: 100%;
  height: ${PATHVIEW_HEIGHT}px;
`;

export const StyledToolbar = styled.div`
  width: 100%;
  height: ${TOOLBAR_HEIGHT}px;
  position: relative;
  z-index: 100;
  display: flex;
  flex-flow: row;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
`;
