import styled, { css } from 'styled-components';

import { robotoMedium, noButtons } from '~/renderer/mixins';

export const StyledSidebar = styled.div`
  width: 200px; /*274px;*/
  height: 100%;
  background-color: rgba(0, 0, 0, 0.04);
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
  height: 48px;
  font-size: 14px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  ${robotoMedium()};
`;
