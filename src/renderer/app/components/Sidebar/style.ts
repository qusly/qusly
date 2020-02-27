import styled from 'styled-components';

import { robotoBold } from '~/renderer/mixins';

export const StyledSidebar = styled.div`
  width: 256px;
  height: 100%;
  position: relative;
  background-color: rgba(0, 0, 0, 0.04);
`;

export const Header = styled.div`
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  font-size: 16px;
  ${robotoBold()};
`;
