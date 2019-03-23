import styled, { css } from 'styled-components';

import { centerImage, robotoMedium, centerBoth } from '~/renderer/mixins';
import { transparency, PRIMARY_COLOR } from '~/renderer/constants';

export const StyledNavDrawerItem = styled.div`
  width: calc(100% - 16px);
  height: 40px;
  margin: 4px auto;
  cursor: pointer;
  overflow: hidden;
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  will-change: background-color;
  transition: 0.2s background-color;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 4px;
    overflow: hidden;
    background-color: ${PRIMARY_COLOR};
    will-change: opacity;
    transition: 0.2s opacity;
    ${centerBoth()};
  }

  ${({ selected }: { selected: boolean }) => css`
    pointer-events: ${selected ? 'none' : 'auto'};

    &::before {
      opacity: ${selected ? 0.15 : 0};
    }
  `};
`;

interface IIconProps {
  selected: boolean;
  icon: any;
}

export const StyledIcon = styled.div`
  min-width: 24px;
  min-height: 24px;
  margin-left: 8px;
  ${centerImage('24px', 'auto')};

  ${({ selected, icon }: IIconProps) => css`
    background-color: ${selected ? PRIMARY_COLOR : '#000'};
    mask-image: url(${icon});
    opacity: ${selected
      ? transparency.icons.active
      : transparency.icons.inactive};
  `};
`;

export const StyledLabel = styled.div`
  font-size: 14px;
  margin-left: 32px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  ${robotoMedium()};

  ${({ selected }: { selected: boolean }) => css`
    color: ${selected ? PRIMARY_COLOR : '#000'};
  `};
`;
