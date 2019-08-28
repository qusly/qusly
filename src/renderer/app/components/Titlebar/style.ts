import styled from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { icons } from '~/renderer/constants';
import { TITLEBAR_HEIGHT } from '~/renderer/app/constants';

export const StyledTitlebar = styled.div`
  height: ${TITLEBAR_HEIGHT}px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const Title = styled.div`
  font-size: 12px;
  margin-left: auto;
  margin-right: auto;
`;

export const Handle = styled.div`
  position: absolute;
  left: 3px;
  top: 3px;
  bottom: 0px;
  right: 3px;
  -webkit-app-region: drag;
`;

export const Icon = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 8px;
  background-image: url(${icons.qusly});
  ${centerIcon()};
`;

export const TrafficButtons = styled.div`
  width: 72px;
`;
