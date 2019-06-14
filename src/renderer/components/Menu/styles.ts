import styled from 'styled-components';
import { noButtons } from 'wexond-ui';

import { MENU_WIDTH } from '~/renderer/constants';

export const ButtonsBar = styled.div`
  width: ${MENU_WIDTH}px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.08);
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-top: 8px;
  padding-right: 2px;
  background-color: rgba(0, 0, 0, 0.04);
  ${noButtons()};
`;
