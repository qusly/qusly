import styled from 'styled-components';

import { transparency, TOOLBAR_HEIGHT } from '~/renderer/constants';

export const StyledAppBar = styled.div`
  padding-left: 24px;
  border-bottom: 1px solid rgba(0, 0, 0, ${transparency.dividers});
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
