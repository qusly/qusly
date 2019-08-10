import styled, { css } from 'styled-components';
import { centerIcon, transparency } from 'wexond-ui';

import { MENU_WIDTH } from '~/renderer/constants';

export const StyledButton = styled.div`
  width: ${MENU_WIDTH}px;
  height: ${MENU_WIDTH}px;
  cursor: pointer;
  position: relative;

  ${({ disabled }: { disabled: boolean }) => css`
    pointer-events: ${disabled ? 'none' : 'auto'};
  `}
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
  disabled,
}: {
  icon: any;
  selected: boolean;
  size: number;
  disabled: boolean;
}) => css`
    background-image: url(${icon});
    opacity: ${disabled ? transparency.icons.disabled : (selected ? 1 : transparency.icons.inactive)};
    ${centerIcon(size)};
  `}
`;
