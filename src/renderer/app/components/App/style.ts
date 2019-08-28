import styled from 'styled-components';

import { TITLEBAR_HEIGHT } from '~/renderer/app/constants';

export const StyledApp = styled.div`
  width: 100vw;
  height: 100vh;
`;

export const Container = styled.div`
  width: 100%;
  height: calc(100% - ${TITLEBAR_HEIGHT}px);
  display: flex;
`;
