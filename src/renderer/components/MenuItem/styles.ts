import styled, { css } from 'styled-components';

export const StyledMenuItem = styled.div`
  width: 100%;
  height: 32px;
  padding-left: 16px;
  padding-right: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #000;
  cursor: pointer;

  ${({ selected }: { selected: boolean }) => css`
    background-color: ${selected ? 'rgba(0, 0, 0, 0.04)' : '#fff'};
  `}

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
