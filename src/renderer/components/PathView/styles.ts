import styled, { css } from 'styled-components';

import { PATHVIEW_HEIGHT, icons, transparency } from '~/renderer/constants';
import { robotoRegular, centerImage, robotoMedium } from '~/renderer/mixins';

export const StyledPathView = styled.div`
  width: 100%;
  height: ${PATHVIEW_HEIGHT}px;
  display: flex;
`;

export const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  user-select: none;
`;

export const StyledLabel = styled.div`
  font-size: 18px;
  padding: 4px 6px;
  border-radius: 6px;
  cursor: pointer;
  text-transform: lowercase;
  ${robotoRegular()};

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  &::first-letter {
    text-transform: uppercase;
  }

  &:last-child {
    ${robotoMedium()};
  }
`;

export const StyledChevron = styled.div`
  width: 24px;
  height: 24px;
  opacity: ${transparency.icons.inactive};
  background-image: url(${icons.chevron});
  ${centerImage('24px', 'auto')};
`;

export const StyledInput = styled.input`
  width: calc(100% - 24px);
  height: 32px;
  background-color: #eee;
  outline: none;
  border: none;
  position: absolute;
  left: 0;
  border-radius: 32px;
  padding: 0 16px;
  font-size: 14px;
  will-change: opacity;
  transition: 0.15s opacity;
  ${robotoRegular()};

  ${({ visible }: { visible: boolean }) => css`
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'all' : 'none'};
  `}
`;
