import styled, { css } from 'styled-components';
import { centerIcon, transparency } from 'wexond-ui';

import { MENU_WIDTH } from '~/renderer/constants';

export const StyledButton = styled.div`
  width: ${MENU_WIDTH}px;
  height: ${MENU_WIDTH}px;
  cursor: pointer;
  position: relative;
`;

export const Icon = styled.div`
  width: ${MENU_WIDTH}px;
  height: ${MENU_WIDTH}px;

  &:hover {
    opacity: 1;
  }

  ${({
    icon,
    selected,
    size,
  }: {
    icon: any;
    selected: boolean;
    size: number;
  }) => css`
    background-image: url(${icon});
    opacity: ${selected ? 1 : transparency.icons.inactive};
    ${centerIcon(size)};
  `}
`;
