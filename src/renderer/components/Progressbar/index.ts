import styled, { css } from 'styled-components';

export const Progressbar = styled.div`
  width: 240px;
  height: 4px;
  position: relative;

  &::before, &::after {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    background-color: #2196F3;
  }

  &::before {
    width: 100%;
    opacity: 0.38;
  }

  ${({ value }: { value?: number }) => css`
    &::after {
      width: ${value}%;
    }
  `}
`;
