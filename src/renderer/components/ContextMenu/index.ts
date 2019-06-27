import styled, { css } from 'styled-components';
import { shadows, transparency } from 'wexond-ui';

import { ContextMenuPos } from '~/renderer/models';

export const ContextMenu = styled.div`
  width: 244px;
  background-color: #fff;
  border-radius: 4px;
  position: fixed;
  z-index: 1000;
  padding: 8px 0px;
  transition: 0.15s opacity;
  box-shadow: ${shadows(4)};

  ${({ visible, pos }: { visible: boolean, pos: ContextMenuPos }) => css`
    pointer-events: ${visible ? 'auto' : 'none'};
    opacity: ${visible ? 1 : 0};
    top: ${pos.top}px;
    left: ${pos.left}px;
  `}
`;

export const ContextMenuItem = styled.div`
  width: 100%;
  height: 32px;
  padding: 0px 24px;
  font-size: 14px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  ${({ disabled }: { disabled?: boolean }) => css`
    pointer-events: ${disabled ? 'none' : 'auto'};
    color: ${disabled ? `rgba(0, 0, 0, ${transparency.text.disabled})` : '#000'};
  `}

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
