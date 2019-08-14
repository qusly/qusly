import styled from 'styled-components';

import { robotoMedium } from '~/renderer/mixins';

export const StyledSidebar = styled.div`
  width: 200px; /*274px;*/
  height: 100%;
  background-color: rgba(0, 0, 0, 0.04);
`;

export const StyledPage = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  height: 48px;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  ${robotoMedium()};
`;
