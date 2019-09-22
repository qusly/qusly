import styled, { css } from 'styled-components';

import { EASING_FUNCTION } from '../../constants';
import { robotoMedium, shadows } from '~/renderer/mixins';

export const StyledDialog = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.54);
  }
`;

export const Container = styled.div`
  width: 344px;
  max-width: 512px;
  height: fit-content;
  background-color: #fff;
  border-radius: 8px;
  padding-bottom: 8px;
  z-index: 11;
  transition: 0.15s transform ${EASING_FUNCTION};
  box-shadow: ${shadows(4)};
`;

export const Title = styled.div`
  padding: 16px 16px 8px 16px;
  font-size: 16px;
  ${robotoMedium()};
`;

export const Content = styled.div`
  padding: 8px 16px;
`;
