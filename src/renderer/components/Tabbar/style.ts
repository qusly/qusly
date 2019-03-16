import styled from 'styled-components';

import ToolbarButton from '../ToolbarButton';
import {
  PRIMARY_COLOR,
  TOOLBAR_BUTTON_WIDTH,
  TOOLBAR_HEIGHT,
} from '~/renderer/constants';

export const StyledTabbar = styled.div`
  width: 100%;
  height: ${TOOLBAR_HEIGHT}px;
  position: relative;
  overflow: hidden;
  transition: 0.3s opacity, 0.3s transform;
  margin-right: 32px;
  display: flex;
`;

export const TabsContainer = styled.div`
  width: calc(100% - ${TOOLBAR_BUTTON_WIDTH}px);
  height: 100%;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  display: flex;
  align-items: center;
`;

export const Indicator = styled.div`
  width: 200px;
  height: 2px;
  position: absolute;
  border-radius: 5px;
  bottom: 0;
  z-index: 3;
  background-color: ${PRIMARY_COLOR};
`;

export const AddTab = styled(ToolbarButton)`
  position: absolute;
  left: 0;
  top: 0;
`;
