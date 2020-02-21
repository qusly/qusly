import styled, { css } from 'styled-components';
import { SelectionArea } from 'rectangle-selection';

import { APPBAR_HEIGHT, FILE_HEIGHT } from '../../constants';

export const StyledPage = styled.div`
  width: 100%;
  height: calc(100% - ${APPBAR_HEIGHT}px);
`;

export const StyledPageGridBase = css`
  width: 100%;
  height: 100%;
  padding: 24px;
  display: grid;
  grid-gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(96px, 1fr));
  grid-template-rows: 1fr;
  grid-template-rows: repeat(auto-fill, ${FILE_HEIGHT}px);
`;

export const Grid = styled(SelectionArea)`
  overflow-y: auto;
  ${StyledPageGridBase};
`;
