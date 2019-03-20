import styled, { css } from 'styled-components';

interface IWrapperProps {
  minWidth: number;
  maxWidth: number;
}

export const StyledWrapper = styled.div`
  height: 100vh;
  background-color: green;
  position: relative;

  ${({ minWidth, maxWidth }: IWrapperProps) =>
    css`
      min-width: ${minWidth}px;
      max-width: ${maxWidth}px;
    `}
`;

interface IAnchorProps {
  pos: 'left' | 'right';
}

export const StyledAnchor = styled.div`
  width: 4px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  background-color: red;
  cursor: ew-resize;

  ${({ pos }: IAnchorProps) => css`
    left: ${pos === 'left' ? 0 : 'unset'};
  `}
`;
