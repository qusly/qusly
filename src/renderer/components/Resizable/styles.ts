import styled, { css } from 'styled-components';

export const StyledWrapper = styled.div`
  width: 256px;
  height: 100vh;
  background-color: green;
  position: relative;
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
