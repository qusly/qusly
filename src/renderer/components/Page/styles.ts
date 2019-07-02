import styled, { css } from 'styled-components';
import { centerBoth } from 'wexond-ui';

export const StyledPage = styled.div`
  width: 100%;
  height: calc(100% - 82px);
  position: relative;
  overflow: hidden;
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

export const SelectionRegion = styled.div`
  background-color: rgba(98,0,234,0.08);
  border: 1px solid rgba(98,0,234,0.12);
  position: absolute;
  pointer-events: none;

  ${({ visible }: { visible: boolean }) => css`
    display: ${visible ? 'block' : 'none'};
  `}
`;
