import styled from 'styled-components';

import {
  NAVIGATION_DRAWER_PERSISTENT_WIDTH,
  transparency,
} from '~/renderer/constants';

export const Root = styled.div`
  width: ${NAVIGATION_DRAWER_PERSISTENT_WIDTH}px;
  height: calc(100vh - 96px);
  border-right: 1px solid rgba(0, 0, 0, ${transparency.dividers});
`;
