import styled, { css } from 'styled-components';

interface IWrapperProps {
  minWidth: number;
  maxWidth: number;
}

export const StyledResizable = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;

  ${({ minWidth, maxWidth }: IWrapperProps) => css`
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
  z-index: 2;
  cursor: ew-resize;

  ${({ pos }: IAnchorProps) => css`
    left: ${pos === 'left' ? 0 : 'unset'};
  `}
`;
