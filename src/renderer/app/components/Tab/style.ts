import styled, { css } from 'styled-components';
import { icons } from '~/renderer/constants/icons';
import { centerIcon } from '~/renderer/mixins/images';
import { transparency } from '~/renderer/constants/transparency';
import { body2 } from '~/renderer/mixins/typography';

interface CloseProps {
  visible: boolean;
}

export const StyledClose = styled.div`
  position: absolute;
  right: 4px;
  height: 22px;
  width: 22px;
  background-image: url('${icons.close}');
  transition: 0.1s opacity;
  z-index: 10;
  ${centerIcon(16)};

  ${({ visible }: CloseProps) => css`
    opacity: ${visible ? transparency.icons.inactive : 0};
  `}
  
  &:hover:after {
    opacity: 1;
  }

  &:after {
    content: '';
    border-radius: 100%;
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

export const StyledTab = styled.div`
  position: absolute;
  height: 100%;
  width: 0;
  left: 0;
  align-items: center;
  will-change: width;
  -webkit-app-region: no-drag;
  display: flex;

  ${({ selected }: { selected: boolean }) => css`
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-font-smoothing: antialiased;
  backface-visibility: hidden;
  transform: translateZ(0);
  ${body2()};
  font-size: 13px;
  color: black;
`;

export const Subtitle = styled(StyledTitle)`
  opacity: 0.54;
  margin-left: 8px;
`;

interface ContentProps {
  collapsed: boolean;
}

export const StyledContent = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 2;
  align-items: center;
  display: flex;
  margin-left: 12px;

  ${({ collapsed }: ContentProps) => css`
    max-width: calc(100% - ${24 + (collapsed ? 24 : 0)}px);
  `};
`;

export const StyledBorder = styled.div`
  position: absolute;
  width: 1px;
  height: 16px;
  right: -1px;
  top: 50%;
  transform: translateY(-50%);

  ${({ visible }: { visible: boolean }) => css`
    visibility: ${visible ? 'visible' : 'hidden'};
    background-color: rgba(0, 0, 0, 0.12);
  `};
`;

export const TabContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  backface-visibility: hidden;
`;
