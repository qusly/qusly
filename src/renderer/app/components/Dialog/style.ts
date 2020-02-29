import styled, { css } from 'styled-components';

import { CARD_SHADOW } from '../../constants';
import { robotoMedium, noUserSelect, robotoBold } from '~/renderer/mixins';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.64);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  will-change: opacity;
  transition: 0.1s opacity;

  ${({ visible }: { visible: boolean }) => css`
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'auto' : 'none'};
  `}
`;

export const StyledDialog = styled.div`
  width: 100%;
  max-width: 344px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: ${CARD_SHADOW};
`;

export const Title = styled.div`
  font-size: 20px;
  padding: 20px;
  ${robotoBold()};
  ${noUserSelect()};
`;

export const DialogButtons = styled.div`
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  padding-right: 16px;

  & > div {
    min-width: 96px;
  }

  & > :first-child {
    margin-left: auto;
    margin-right: 4px;
  }
`;
