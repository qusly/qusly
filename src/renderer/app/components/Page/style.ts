import styled, { css } from 'styled-components';

import { centerBoth } from '~/renderer/mixins';
import { APPBAR_HEIGHT } from '~/renderer/app/constants';

export const StyledPage = styled.div`
  width: 100%;
  height: calc(100% - ${APPBAR_HEIGHT}px);
  background-color: #fff;
  border-radius: 32px 32px 0px 0px;
  position: relative;
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
