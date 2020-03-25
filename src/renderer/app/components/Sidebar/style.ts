import styled from 'styled-components';

import { robotoBold, noButtons } from '~/renderer/mixins';

export const StyledSidebar = styled.div`
  width: 256px;
  height: 100%;
  position: relative;
  background-color: #fafafc;
`;

export const Content = styled.div`
  height: calc(100% - 48px);
  overflow-y: auto;

  ${noButtons({
    color: 'rgba(0, 0, 0, 0.12)',
    hoverColor: 'rgba(0, 0, 0, 0.32)',
    alwaysVisible: false,
  })};
`;

export const Header = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  font-size: 16px;
  ${robotoBold()};
`;
