import styled from 'styled-components';

import { transparency } from '~/renderer/constants';

export const StyledNavDrawer = styled.div`
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  padding: 8px 0px;
  border-right: 1px solid rgba(0, 0, 0, ${transparency.dividers});
`;
