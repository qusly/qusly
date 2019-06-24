import styled, { css } from 'styled-components';
import { centerBoth, robotoMedium } from 'wexond-ui';

export const StyledPage = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const PreloaderContainer = styled.div`
  position: absolute;
  pointer-events: none;
  transition: 0.1s opacity;
  margin-top: -50px;
  ${centerBoth()};

  ${({ visible }: { visible: boolean }) => css`
    opacity: ${visible ? 1 : 0};
  `}
`;

export const Pagebar = styled.div`
  width: 100%;
  height: 48px;
  min-height: 48px;
  max-height: 48px;
  display: flex;
  align-items: center;
`;

export const PageTitle = styled.div`
  margin-left: 24px;
  font-size: 14px;
  ${robotoMedium()};
`;
