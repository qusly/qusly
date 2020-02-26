import styled, { css, keyframes } from 'styled-components';

const rotateAnimation = keyframes`
  100% {
    -webkit-transform: rotate(360deg);
  }
`;

const dashAnimation = keyframes`
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
  }

  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
  }
`;

interface Props {
  size: number;
  thickness: number;
  color: string;
}

export const StyledPreloader = styled.div`
  transform-origin: center center;
  animation: ${rotateAnimation} 2s linear infinite;
  z-index: 5;
  position: relative;

  ${({ size, thickness, color }: Props) => css`
    width: ${size}px;
    height: ${size}px;

    & circle {
      stroke-width: ${thickness};
      stroke: ${color};
    }
  `};
`;

export const Path = styled.circle`
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  animation: ${dashAnimation} 1.5s ease-in-out infinite,
    color 6s ease-in-out infinite;
  stroke-linecap: square;
  transition: 0.3s stroke;
  position: relative;
`;

export const Background = styled.circle`
  stroke-opacity: 0.54;
`;
