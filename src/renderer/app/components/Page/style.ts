import styled, { keyframes } from 'styled-components';
import { SelectionArea } from 'rectangle-selection';

import { APPBAR_HEIGHT } from '../../constants';
import { Preloader as StyledPreloader } from '~/renderer/components/Preloader';
import { centerBoth } from '~/renderer/mixins';

export const StyledPage = styled.div`
  width: 100%;
  height: calc(100% - ${APPBAR_HEIGHT}px);
  position: relative;
`;

const gridAnimation = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const Grid = styled(SelectionArea)`
  width: 100%;
  height: 100%;
  display: grid;
  padding: 8px 24px;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  grid-template-rows: repeat(auto-fill, 72px);
  overflow-y: auto;
  animation: 0.1s ${gridAnimation};
`;

export const Preloader = styled(StyledPreloader)`
  position: absolute;
  ${centerBoth()};
`;
