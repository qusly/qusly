import styled, { css } from 'styled-components';
import { shadows } from 'wexond-ui';

import { ContextMenuPos } from '~/renderer/models';

export const ContextMenu = styled.div`
  width: 100%;
  max-width: 300px;
  background-color: #fff;
  border-radius: 4px;
  position: fixed;
  z-index: 1000;
  padding: 8px 0px;
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
  padding: 0px 16px;
  display: flex;
  align-items: center;
`;
