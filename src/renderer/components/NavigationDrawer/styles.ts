import styled from 'styled-components';

import {
  APPBAR_HEIGHT,
  NAVIGATION_DRAWER_PERSISTENT_WIDTH,
  transparency,
} from '~/renderer/constants';

export const Root = styled.div`
  width: ${NAVIGATION_DRAWER_PERSISTENT_WIDTH}px;
  height: 100vh;
  position: absolute;
  left: 0;
  bottom: 0;
  border-right: 1px solid rgba(0, 0, 0, ${transparency.dividers});
`;
