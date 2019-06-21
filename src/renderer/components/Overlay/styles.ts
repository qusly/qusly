import styled, { css } from 'styled-components';

export const StyledOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  transition: 0.15s opacity, 0.15s background-color;

  ${({ visible }: { visible: boolean }) => css`
    pointer-events: ${visible ? 'auto' : 'none'};
    opacity: ${visible ? 1 : 0};
    background-color: ${visible ? 'rgba(0, 0, 0, 0.54)' : 'transparent'};
  `}
`;
