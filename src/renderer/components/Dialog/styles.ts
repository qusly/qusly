import styled from 'styled-components';

import { centerBoth, shadows, robotoMedium } from '~/renderer/mixins';

export const StyledDialog = styled.div`
  width: 100%;
  max-width: 512px;
  height: auto;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  box-shadow: ${shadows(2)};
`;

export const Title = styled.div`
  padding: 16px 0px;
  font-size: 20px;
  color: #000;
`;

export const Buttons = styled.div`
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
