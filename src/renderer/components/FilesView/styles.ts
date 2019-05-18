import styled from 'styled-components';

export const StyledFilesView = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 24px;
`;

export const FilesContainer = styled.div`
  display: grid;
  grid-gap: 32px;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fit, minmax(64px, 1fr));
`;
