import styled from 'styled-components';
import { SelectionArea } from 'rectangle-selection';

import { APPBAR_HEIGHT } from '../../constants';

export const StyledPage = styled.div`
  width: 100%;
  height: calc(100% - ${APPBAR_HEIGHT}px);
  position: relative;
`;

export const Grid = styled(SelectionArea)`
  width: 100%;
  height: 100%;
  display: grid;
  padding: 8px 24px;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  grid-template-rows: repeat(auto-fill, 72px);
  overflow-y: auto;
`;
