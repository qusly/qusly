import styled from 'styled-components';

import { TITLEBAR_HEIGHT, BACKGROUND_COLOR } from '../../constants';

export const StyledTitlebar = styled.div`
  height: ${TITLEBAR_HEIGHT}px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  background-color: ${BACKGROUND_COLOR};
`;

export const Title = styled.div`
  font-size: 12px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const Handle = styled.div`
  position: absolute;
  left: 3px;
  top: 3px;
  bottom: 0px;
  right: 3px;
  -webkit-app-region: drag;
`;

export const TrafficButtons = styled.div`
  width: 72px;
`;
