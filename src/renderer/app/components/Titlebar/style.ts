import styled from 'styled-components';
import { TITLEBAR_HEIGHT, TITLE_BAR_COLOR } from '../../constants/design';
import { icons } from '~/renderer/constants/icons';
import { centerIcon } from '~/renderer/mixins/images';

export const StyledTitlebar = styled.div`
  height: ${TITLEBAR_HEIGHT}px;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  background-color: ${TITLE_BAR_COLOR};
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

export const Icon = styled.div`
  width: 18px;
  height: 18px;
  margin-left: 8px;
  background-image: url(${icons.qusly});
  ${centerIcon()};
`;

export const TrafficButtons = styled.div`
  width: 72px;
`;
