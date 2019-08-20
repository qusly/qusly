import styled, { css } from 'styled-components';

import { centerBoth, noButtons } from '~/renderer/mixins';
import { APPBAR_HEIGHT } from '~/renderer/app/constants';

export const StyledPage = styled.div`
  width: 100%;
  height: calc(100% - ${APPBAR_HEIGHT}px);
  background-color: #fff;
  border-radius: 32px 32px 0px 0px;
  position: relative;

  & .selection-container {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 24px;
    padding-top: 16px;
    display: grid;
    grid-gap: 8px;
    grid-template-rows: 1fr;
    grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
    grid-template-rows: repeat(auto-fill, 82px);
    position: relative;
    transition: 0.1s opacity;
    ${noButtons()};
  }
`;

export const PreloaderContainer = styled.div`
  position: absolute;
  pointer-events: none;
  transition: 0.1s opacity;
  ${centerBoth()};

  ${({ visible }: { visible: boolean }) => css`
    opacity: ${visible ? 1 : 0};
  `}
`;
