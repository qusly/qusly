import styled, { css } from 'styled-components';

import {
  transparency,
  icons,
  TABS_PADDING,
  PRIMARY_COLOR,
} from '~/renderer/constants';
import { centerImage, body2 } from '~/renderer/mixins';

interface CloseProps {
  visible: boolean;
}

export const StyledClose = styled.div`
  position: absolute;
  right: 6px;
  height: 24px;
  width: 24px;
  background-image: url('${icons.close}');
  transition: 0.1s opacity;
  z-index: 10;
  ${centerImage('16px', '16px')};
  opacity: ${({ visible }: CloseProps) =>
    visible ? transparency.icons.inactive : 0};

  &:hover {
    &:after {
      opacity: 1;
    }
  }

  &:after {
    content: '';
    border-radius: 50px;
    background-color: rgba(0, 0, 0, 0.08);
    transition: 0.2s opacity;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
  }
`;

interface TabProps {
  selected: boolean;
  isClosing: boolean;
  hovered: boolean;
}

export const StyledTab = styled.div`
  position: absolute;
  height: 100%;
  overflow: hidden;
  width: 0;
  left: 0;
  will-change: width;
  user-select: none;
  display: inline-flex;
  align-items: center;
  backface-visibility: hidden;
  margin-right: ${TABS_PADDING}px;
  -webkit-app-region: no-drag;

  ${({ selected }: TabProps) => css`
    z-index: ${selected ? 2 : 1};
  `};
`;

export const StyledOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: 0.1s opacity;
  background-color: rgba(0, 0, 0, 0.04);

  ${({ hovered }: { hovered: boolean }) => css`
    opacity: ${hovered ? 1 : 0};
  `};
`;

export const StyledTitle = styled.div`
  ${body2()};
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;
  font-weight: 500;

  ${({ selected }: { selected: boolean }) => css`
    color: ${selected
      ? PRIMARY_COLOR
      : `rgba(0, 0, 0, ${transparency.text.medium})`};
  `};
`;

export const StyledContent = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 2;
  display: flex;
  will-change: max-width, transform;
  transition: 0.1s max-width, 0.1s transform;
  -webkit-font-smoothing: antialiased;

  ${({ hovered }: { hovered: boolean }) => {
    return css`
      left: 50%;
      transform: translateX(${hovered ? 'calc(-50% - 12px)' : '-50%'});
      max-width: calc(100% - ${24 + (hovered ? 24 : 0)}px);
    `;
  }};
`;
