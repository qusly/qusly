import styled from 'styled-components';

import { DEFAULT_NAV_DRAWER_WIDTH, transparency } from '~/renderer/constants';

export const StyledNavDrawer = styled.div`
  width: ${DEFAULT_NAV_DRAWER_WIDTH}px;
  height: 100vh;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 8px 0px;
  border-right: 1px solid rgba(0, 0, 0, ${transparency.dividers});
`;
