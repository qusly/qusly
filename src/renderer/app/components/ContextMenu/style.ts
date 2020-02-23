import styled, { css } from 'styled-components';
import { shadows } from '~/renderer/mixins/shadows';
import { transparency } from '~/renderer/constants/transparency';
import { centerIcon } from '~/renderer/mixins/images';

export const StyledContextMenu = styled.table`
  position: fixed;
  z-index: 1000;
  padding: 4px 0px;
  background-color: #fff;
  border-radius: 4px;
  border-spacing: 0;
  pointer-events: none;
  opacity: 0;
  transition: unset;
  box-shadow: ${shadows(4)};

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
        opacity: ${disabled
          ? transparency.icons.disabled
          : transparency.icons.inactive};
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
