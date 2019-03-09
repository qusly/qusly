import styled from 'styled-components';

import { PRIMARY_COLOR } from '~/renderer/constants';

export const StyledTabbar = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  transition: 0.3s opacity, 0.3s transform;
  margin-left: 4px;
  margin-right: 32px;
  display: flex;
`;

export const TabsContainer = styled.div`
  height: 100%;
  width: 100%;
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
