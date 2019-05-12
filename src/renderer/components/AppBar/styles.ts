import styled from 'styled-components';

import { transparency } from '~/renderer/constants';

export const StyledAppBar = styled.div`
  width: 100vw;
  height: 94px;
  border-bottom: 1px solid rgba(0, 0, 0, ${transparency.dividers});
`;
