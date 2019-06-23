import styled from 'styled-components';

export const HorizontalLayout = styled.div`
  display: flex;
  flex: 1;
`;

export const VerticalLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
`;

export const AppContent = styled.div`
  flex: 1;
`;

export const Titlebar = styled.div`
  height: 32px;
  display: flex;
  background-color: rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const Handle = styled.div`
  position: absolute;
  left: 3px;
  top: 3px;
  bottom: 0px;
  right: 3px;
`;
