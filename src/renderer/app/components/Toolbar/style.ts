import styled from 'styled-components';

import { TOOLBAR_HEIGHT, TOOLBAR_COLOR } from '~/renderer/app/constants';

export const StyledToolbar = styled.div`
  width: 100%;
  height: ${TOOLBAR_HEIGHT}px;
  position: relative;
  display: flex;
  flex-flow: row;
  align-items: center;
  padding-right: 24px;
  background-color: ${TOOLBAR_COLOR};
`;

export const Search = styled.div`
  width: 300px;
  height: 32px;
  border-radius: 32px;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-left: 16px;
  padding-left: 8px;
  border: 1px solid rgba(0, 0, 0, 0.12);
`;
