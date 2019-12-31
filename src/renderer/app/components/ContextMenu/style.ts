import styled, { css } from 'styled-components';

import { shadows, centerIcon } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';

export const StyledContextMenu = styled.div`
  position: fixed;
  z-index: 1000;
  padding: 4px 0px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: ${shadows(4)};

  ${({ visible }: { visible: boolean }) => css`
    pointer-events: ${visible ? 'auto' : 'none'};
    opacity: ${visible ? 1 : 0};
    transition: ${visible ? '0.15s opacity' : 'unset'};
  `}
`;

export const Items = styled.table`
  display: table;
  border-collapse: collapse;
  width: 100%;
`;

export interface IContextMenuItemProps {
  icon?: string;
  disabled?: boolean;
  iconSize?: number;
  hidden?: boolean;
  value?: any;
}

export const StyledItem = styled.tr`
  width: 100%;
  height: 32px;
  align-items: center;
  font-size: 13px;
  white-space: nowrap;

  ${({ disabled, hidden }: IContextMenuItemProps) => css`
    display: ${!hidden ? 'table-row' : 'none'};
    color: ${disabled
      ? `rgba(0, 0, 0, ${transparency.text.disabled})`
      : '#000'};

    &:hover {
      background-color: ${!disabled ? 'rgba(0, 0, 0, 0.04)' : 'transparent'};
    }
  `}
`;

export const MenuDivider = styled.tr`
  width: 100%;
  height: 9px;

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    margin-top: 4px;
    height: 1px;
    background-color: rgba(0, 0, 0, ${transparency.dividers});
  }
`;

export const Accelerator = styled.td`
  opacity: 0.54;
  font-size: 13px;
  padding-right: 10px;
  padding-left: 10px;
  text-align: right;
`;

export const Icon = styled.td`
  ${({ icon, disabled, iconSize }: IContextMenuItemProps) => css`
    ${icon &&
      css`
        width: 20px;
        height: 20px;
        opacity: ${disabled ? transparency.icons.disabled : 0.87};
        background-image: url(${icon});
        backface-visibility: hidden;
        transform: translateZ(0);
        -webkit-font-smoothing: subpixel-antialiased;
        ${centerIcon(iconSize)};
      `}
  `}
`;

export const Text = styled.td`
  font-size: 13px;
  padding-left: 10px;
  padding-right: 10px;
`;
