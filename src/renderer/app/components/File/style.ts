import styled, { css } from 'styled-components';

export const StyledFile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  border-radius: 6px;

  ${({ selected }: { selected: boolean }) => css`
    background-color: ${selected
      ? `rgba(98, 0, 234, 0.08)`
      : 'rgba(0, 0, 0, 0.04)'};
  `}
`;
