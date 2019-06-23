import styled from 'styled-components';
import { centerIcon } from 'wexond-ui';

import quslyIcon from '../../resources/icons/qusly.png';

export const StyledTitlebar = styled.div`
  height: 32px;
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;
  align-items: center;
  justify-content: space-between;
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
  margin-left: 8px;
  width: 20px;
  height: 20px;
  ${centerIcon()};
  background-image: url(${quslyIcon});
`;

export const TrafficButtons = styled.div`
  width: 72px;
`;
