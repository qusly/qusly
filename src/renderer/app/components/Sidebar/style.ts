import styled, { css } from 'styled-components';

import { noButtons, body2, robotoMedium } from '~/renderer/mixins';
import { SIDEBAR_TITLE_HEIGHT } from '~/renderer/app/constants';

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

  ${({ visible }: { visible: boolean }) => css`
    display: ${visible ? 'block' : 'none'};
  `};
`;

export const Title = styled.div`
  height: ${SIDEBAR_TITLE_HEIGHT}px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  ${body2()};
  ${robotoMedium()};
`;

export const Content = styled.div`
  width: 100%;
  height: calc(100% - ${SIDEBAR_TITLE_HEIGHT}px);
  overflow-x: hidden;
  overflow-y: visible;
  padding-bottom: 8px;
  ${noButtons({ color: 'rgba(0, 0, 0, 0.08)', hoverColor: 'rgba(0, 0, 0, 0.32)', alwaysVisible: false })};
`;
