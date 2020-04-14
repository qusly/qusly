import styled from 'styled-components';

import { TOOLBAR_HEIGHT } from '../../constants';
import { ToolbarButton } from '~/renderer/components/ToolbarButton';

export const StyledToolbar = styled.div`
  width: 100%;
  height: ${TOOLBAR_HEIGHT}px;
  position: relative;
  display: flex;
  flex-flow: row;
  align-items: center;
  padding-right: 24px;
`;

export const StyledNavigation = styled.div`
  display: flex;
`;

export const Button = styled(ToolbarButton)`
  &:not(:first-child) {
    margin-left: 4px;
  }
`;
