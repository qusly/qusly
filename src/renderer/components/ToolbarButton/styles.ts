import styled, { css } from 'styled-components';

import { TOOLBAR_BUTTON_WIDTH } from '~/renderer/constants';
import { centerImage } from '~/renderer/mixins';

interface IconProps {
  size: number;
  disabled: boolean;
  icon: string;
  opacity: number;
}

export const Icon = styled.div`
  width: 100%;
  height: 100%;
  will-change: background-image;
  transition: 0.15s background-image;
  -webkit-backface-visibility: hidden;
  transform: translate3d(0, 0, 0) translateZ(0);

  ${({ size, disabled, icon, opacity }: IconProps) => css`
    ${centerImage(`${size}px`, `${size}px`)};
    opacity: ${disabled ? 0.25 : opacity};
    background-image: url(${icon});
  `};
`;

export const Button = styled.div`
  width: ${TOOLBAR_BUTTON_WIDTH}px;
  height: 100%;
  margin-right: 8px;
  -webkit-app-region: no-drag;
  position: relative;
  transition: 0.2s background-color;

  ${({ disabled }: { disabled: boolean }) => css`
    pointer-events: ${disabled ? 'none' : 'auto'};
  `};
`;

export const Circle = styled.div`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  transition: 0.2s background-color;

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
`;
