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

export const Menu = styled.div`
  min-width: 250px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.06);
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 16px;
`;

export const Search = styled.div`
  height: 30px;
  background-color: rgba(0, 0, 0, 0.06);
  width: 100%;
  border-radius: 20px;
`;

export const SearchContainer = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
`;

export const AppContent = styled.div`
  flex: 1;
`;
