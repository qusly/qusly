import styled, { css } from 'styled-components';

export const Root = styled.div`
  position: absolute;
  height: 3px;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;

  ${({ visible }: { visible: boolean }) => css`
    display: ${visible ? 'block' : 'none'};
  `};
`;

export const Thumb = styled.div`
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  background-color: black;
  transition: 0.2s opacity;
  -webkit-app-region: no-drag;

  ${({ visible }: { visible: boolean }) => css`
    opacity: ${visible ? 0.2 : 0};
  `}

  &:hover {
    opacity: 0.4;
  }

  &:active {
    opacity: 0.4;
  }
`;
