import styled, { css } from 'styled-components';
import { SIDE_BAR_COLOR, SIDEBAR_HEADER_HEIGHT } from '../../constants/design';
import { robotoLight } from '~/renderer/mixins/typography';
import { noButtons } from '~/renderer/mixins/scroll';

export const StyledSidebar = styled.div`
  height: 100%;
  background-color: ${SIDE_BAR_COLOR};
  position: relative;
  z-index: 3;
`;

export const StyledPage = styled.div`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;

  &:focus {
    box-shadow: inset 0 0 0 2px #bbdefb;
  }

  ${({ visible }: { visible: boolean }) => css`
    display: ${visible ? 'block' : 'none'};
  `};
`;

export const Header = styled.div`
  height: ${SIDEBAR_HEADER_HEIGHT}px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 8px;
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
