import styled, { css } from 'styled-components';

import { noButtons, robotoLight } from '~/renderer/mixins';
import { SIDEBAR_HEADER_HEIGHT } from '~/renderer/app/constants';

export const StyledSidebar = styled.div`
  height: 100%;
  background-color: #fafafa;
`;

export const StyledPage = styled.div`
  width: 100%;
  height: 100%;

  ${({ visible }: { visible: boolean }) => css`
    display: ${visible ? 'block' : 'none'};
  `};
`;

export const Header = styled.div`
  height: ${SIDEBAR_HEADER_HEIGHT}px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 4px;
  font-size: 16px;
  ${robotoLight()};

  & > .toolbar-button {
    height: ${SIDEBAR_HEADER_HEIGHT}px;
    margin-left: auto;
    cursor: pointer;
  }
`;

export const Content = styled.div`
  width: 100%;
  height: calc(100% - ${SIDEBAR_HEADER_HEIGHT}px);
  overflow-x: hidden;
  overflow-y: visible;
  padding-bottom: 8px;
  ${noButtons({
    color: 'rgba(0, 0, 0, 0.12)',
    hoverColor: 'rgba(0, 0, 0, 0.32)',
    alwaysVisible: false,
  })};
`;
