import styled from 'styled-components';

import { transparency } from '~/renderer/constants';

export const StyledNavDrawer = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 8px 0px;
  border-right: 1px solid rgba(0, 0, 0, ${transparency.dividers});
`;
