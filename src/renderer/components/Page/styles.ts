import styled, { css } from 'styled-components';
import { centerBoth } from 'wexond-ui';

export const StyledPage = styled.div`
  width: 100%;
  height: calc(100% - 80px);
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
