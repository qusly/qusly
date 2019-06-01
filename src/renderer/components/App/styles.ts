import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: calc(100% - 80px);
`;

export const StyledApp = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;

export const Search = styled.div`
  height: 32px;
  background-color: rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  margin-left: 24px;
  margin-right: 24px;
  margin-top: 24px;
`;

export const SearchContainer = styled.div`
  height: 92px;
  display: flex;
  align-items: center;
  margin-left: 24px;
  margin-right: 24px;
`;

export const AppContent = styled.div`
  flex: 1;
`;

export const Title = styled.div`
  font-size: 11px;
  margin-left: 24px;
  display: flex;
  align-items: center;
  height: 42px;
`;
