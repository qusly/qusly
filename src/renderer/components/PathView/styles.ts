import styled, { css } from 'styled-components';
import { robotoRegular } from 'wexond-ui';

export const StyledPathView = styled.div`
  width: 100%;
  height: 32px;
  margin-left: 8px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  cursor: text;
  position: relative;

  &:hover {
    border: 1px solid rgba(0, 0, 0, 0.14);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;

  ${({ visible }: { visible: boolean }) => css`
    display: ${visible ? 'flex' : 'none'};
  `}
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  font-size: 13px;
  padding-left: 12px;
  border: none;
  outline: none;
  background-color: transparent;
  user-select: auto;
  color: #000;
  top: 0;
  left: 0;
  position: absolute;
  ${robotoRegular()};

  ${({ visible }: { visible: boolean }) => css`
    display: ${visible ? 'block' : 'none'};
  `}
`;
