import styled, { css } from 'styled-components';
import { robotoRegular } from 'wexond-ui';

export const StyledPathView = styled.div`
  width: 100%;
  height: 32px;
  margin-left: 8px;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  cursor: text;
  position: relative;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 8px;
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
