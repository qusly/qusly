import styled, { css } from 'styled-components';

import { centerIcon, centerBoth } from '~/renderer/mixins';
import { TOOLBAR_BUTTON_SIZE } from '~/renderer/app/constants';

export const Button = styled.div`
  width: ${TOOLBAR_BUTTON_SIZE}px;
  height: ${TOOLBAR_BUTTON_SIZE}px;
  position: relative;
  transition: 0.2s background-color;
  backface-visibility: hidden;

  ${({ disabled }: { disabled: boolean }) => css`
    pointer-events: ${disabled ? 'none' : 'inherit'};
  `};
`;

interface IconProps {
  size: number;
  disabled: boolean;
  opacity: number;
}

export const Icon = styled.div`
  width: 100%;
  height: 100%;
  will-change: background-image;
  transition: 0.15s background-image;
  backface-visibility: hidden;

  ${({ size, disabled, opacity }: IconProps) => css`
    ${centerIcon(size)};
    opacity: ${disabled ? 0.25 : opacity};
  `};
`;

export const Circle = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  position: absolute;
  overflow: hidden;
  transition: 0.2s background-color;
  ${centerBoth()};

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
