import styled from 'styled-components';

import { centerVertical } from '~/renderer/mixins';
import { ToolbarButton } from '~/renderer/components/ToolbarButton';
import {
  TABBAR_HEIGHT,
  TOOLBAR_BUTTON_SIZE,
  BACKGROUND_COLOR,
} from '../../constants/design';

export const StyledTabbar = styled.div`
  width: 100%;
  height: ${TABBAR_HEIGHT}px;
  position: relative;
  overflow: hidden;
  display: flex;
  z-index: 2;
  background-color: ${BACKGROUND_COLOR};
  transition: 0.3s opacity, 0.3s transform;
  -webkit-app-region: drag;
`;

export const TabsContainer = styled.div`
  height: 100%;
  width: calc(100% - ${TOOLBAR_BUTTON_SIZE}px);
  bottom: 0;
  position: absolute;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

export const AddTab = styled(ToolbarButton)`
  width: 28px;
  height: 28px;
  position: absolute;
  left: 2px;
  ${centerVertical()};
`;
