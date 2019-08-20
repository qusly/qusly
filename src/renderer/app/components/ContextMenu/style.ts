import styled, { css } from 'styled-components';

import { shadows } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';

export const StyledContextMenu = styled.div`
  width: 244px;
  border-radius: 4px;
  position: fixed;
  z-index: 1000;
  padding: 8px 0px;
  background-color: #fff;
  box-shadow: ${shadows(4)};

  ${({ visible }: { visible: boolean }) => css`
    pointer-events: ${visible ? 'auto' : 'none'};
    opacity: ${visible ? 1 : 0};
    transition: ${visible ? '0.15s opacity' : 'unset'};
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
    color: ${disabled
      ? `rgba(0, 0, 0, ${transparency.text.disabled})`
      : '#000'};

    &:hover {
      background-color: ${!disabled ? 'rgba(0, 0, 0, 0.04)' : 'transparent'};
    }
  `}
`;
