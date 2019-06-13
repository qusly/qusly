import styled from 'styled-components';
import { noButtons } from 'wexond-ui';

import { MENU_WIDTH } from '~/renderer/constants';

export const ButtonsBar = styled.div`
  width: ${MENU_WIDTH}px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.08);
`;

export const Container = styled.div`
  width: calc(100% - 2px);
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.04);
  ${noButtons()};
`;
