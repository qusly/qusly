import styled from 'styled-components';
import { SelectionArea } from 'rectangle-selection';

export const StyledPage = styled(SelectionArea)`
  width: 100%;
  min-height: 512px;
  max-height: 100%;
  overflow-y: auto;
  /* display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr)); */
  /* background-color: rgba(0, 0, 0, 0.12); */
  /* margin: 64px auto; */
  margin: 64px;

  &::after {
    content: '';
    width: 1px;
    height: 1024px;
  }
`;
