import styled, { css } from 'styled-components';

import { centerIcon, blurBackground } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';
import { PRIMARY_COLOR } from '../../constants';

export const StyledContextMenu = styled.table`
  position: fixed;
  z-index: 1000;
  padding: 4px 0px;
  border-radius: 4px;
  border-spacing: 0;
  pointer-events: none;
  opacity: 0;
  ${blurBackground};

  ${({ visible }: { visible: boolean }) => css`
    ${visible &&
      css`
        pointer-events: auto;
        opacity: 1;
        transition: 0.15s opacity;
      `}
  `}
`;

export const Container = styled.tbody`
  width: 100%;
  display: table;
  border-collapse: collapse;
`;

export interface IContextMenuItemProps {
  icon?: string;
  iconSize?: number;
  hidden?: boolean;
  disabled?: boolean;
}

export const StyledItem = styled.tr`
  width: 100%;
  height: 32px;
  align-items: center;
  font-size: 13px;
  white-space: nowrap;
  display: table-row;

  ${({ disabled }: IContextMenuItemProps) => css`
    color: ${disabled
      ? `rgba(0, 0, 0, ${transparency.text.disabled})`
      : '#000'};

    ${!disabled &&
      css`
        cursor: pointer;

        &:hover {
          background-color: ${PRIMARY_COLOR};
          color: #fff;

          & .context-menu-item-icon {
            background-color: #fff;
          }
        }
      `}
  `}
`;

export const Accelerator = styled.td`
  opacity: 0.54;
  font-size: 13px;
  padding-right: 10px;
  padding-left: 10px;
  text-align: right;
`;

export const Icon = styled.td`
  width: 20px;
  height: 20px;
  backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-font-smoothing: subpixel-antialiased;
  background-color: #000;

  ${({ disabled, iconSize }: IContextMenuItemProps) => css`
    opacity: ${disabled ? transparency.icons.disabled : 1};
    ${centerIcon(iconSize, true)};
  `}
`;

export const Text = styled.td`
  font-size: 13px;
  padding-left: 10px;
  padding-right: 10px;
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
