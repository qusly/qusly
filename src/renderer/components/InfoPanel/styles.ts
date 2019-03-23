import styled from 'styled-components';

import { APPBAR_HEIGHT, transparency } from '~/renderer/constants';
import { h6 } from '~/renderer/mixins';

export const StyledContainer = styled.div`
  height: calc(100vh - ${APPBAR_HEIGHT}px);
  position: absolute;
  right: 0;
  bottom: 0;
  padding-top: 8px;
  border-left: 1px solid rgba(0, 0, 0, ${transparency.dividers});
`;

export const StyledTitle = styled.div`
  margin: 8px 16px;
  ${h6()}
`;
