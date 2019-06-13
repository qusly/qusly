import styled, { css } from 'styled-components';
import { noButtons, centerIcon, transparency, centerBoth } from 'wexond-ui';

import { MENU_WIDTH } from '~/renderer/constants';

export const StyledButtons = styled.div`
  width: ${MENU_WIDTH}px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.08);
`;

export const StyledButton = styled.div`
  width: ${MENU_WIDTH}px;
  height: ${MENU_WIDTH}px;
  cursor: pointer;
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: #000;
    opacity: 0;
    border-radius: 100%;
    transition: 0.15s opacity;
    ${centerBoth()};
  }

  &:hover::before {
    opacity: 0.04;
  }
`;

export const Icon = styled.div`
  width: ${MENU_WIDTH}px;
  height: ${MENU_WIDTH}px;
  transition: 0.15s opacity;
  ${centerIcon(24)};

  ${({ icon, selected }: { icon: any, selected: boolean }) => css`
    background-image: url(${icon});
    opacity: ${selected ? 0.8 : transparency.icons.inactive};
  `}
`;

export const Container = styled.div`
  width: calc(100% - 2px);
  height: 100%;
  overflow: auto;
  ${noButtons()};
`;

export const StyledItem = styled.div`
  ${({ visible }: { visible: boolean }) => css`
    pointer-events: ${visible ? 'unset' : 'none'};
    opacity: ${visible ? 1 : 0};
  `}
`
