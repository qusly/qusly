import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Box = styled.div`
  width: 100px;
  height: 100px;
  position: absolute;
  z-index: 1000;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.12);
  pointer-events: none;
  display: none;
`;
