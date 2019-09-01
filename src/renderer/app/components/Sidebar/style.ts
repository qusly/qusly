import styled, { css } from 'styled-components';

import { noButtons, body2 } from '~/renderer/mixins';
import { TABBAR_HEIGHT } from '~/renderer/app/constants';

export const StyledSidebar = styled.div`
  width: 200px; /*274px;*/
  height: 100%;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  background-color: #F5F5F5;
`;

export const StyledPage = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-bottom: 8px;
  ${noButtons()};

  ${({ visible }: { visible: boolean }) => css`
    display: ${visible ? 'block' : 'none'};
  `};
`;

export const Title = styled.div`
  height: ${TABBAR_HEIGHT}px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  ${body2()};
`;
