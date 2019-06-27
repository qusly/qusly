import styled from 'styled-components';
import { shadows } from 'wexond-ui';

export const ContextMenu = styled.div`
  width: 100%;
  max-width: 300px;
  background-color: #fff;
  border-radius: 4px;
  position: fixed;
  margin: 256px;
  padding: 8px 0px;
  box-shadow: ${shadows(4)};
`;

export const ContextMenuItem = styled.div`
  width: 100%;
  height: 32px;
  padding: 0px 16px;
  display: flex;
  align-items: center;
`;
