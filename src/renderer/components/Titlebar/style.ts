import styled from 'styled-components';

export const StyledTitlebar = styled.div`
  height: 32px;
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 12px;
`;

export const Icon = styled.div`
  margin-left: 8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.12);
`;

export const Handle = styled.div`
  position: absolute;
  left: 3px;
  top: 3px;
  bottom: 0px;
  right: 3px;
  -webkit-app-region: drag;
`;
