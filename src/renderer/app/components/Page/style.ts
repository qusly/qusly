import styled from 'styled-components';
import { SelectionArea } from 'rectangle-selection';

import { APPBAR_HEIGHT, FILE_HEIGHT } from '../../constants';

export const StyledPage = styled(SelectionArea)`
  width: 100%;
  height: calc(100% - ${APPBAR_HEIGHT}px);
  overflow-y: auto;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  grid-template-rows: 1fr;
  grid-template-rows: repeat(auto-fill, ${FILE_HEIGHT}px);
  background-color: rgba(0, 0, 0, 0.12);
`;
