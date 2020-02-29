import styled, { css } from 'styled-components';

import { CARD_SHADOW, PRIMARY_COLOR } from '../../constants';
import {
  robotoMedium,
  noUserSelect,
  robotoBold,
  button,
} from '~/renderer/mixins';

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
  padding: 20px;
  box-shadow: ${CARD_SHADOW};
`;

export const Title = styled.div`
  font-size: 20px;
  padding-bottom: 16px;
  ${robotoBold()};
  ${noUserSelect()};
`;

export const Buttons = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  align-items: center;

  & > :first-child {
    margin-left: auto;
    margin-right: 6px;
  }
`;

export const Button = styled.div`
  min-width: 80px;
  width: fit-content;
  height: 32px;
  padding: 0px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 4px;
  position: relative;
  cursor: pointer;
  color: #000;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.08);
  ${robotoMedium()};

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0;
    background-color: #000;
    position: absolute;
    will-change: opacity;
    transition: 0.2s opacity;
  }

  &:hover::before {
    opacity: 0.12;
  }
`;

export const OkButton = styled(Button)`
  color: #fff;
  background-color: #2196f3;

  &::before {
    background-color: #fff;
  }
`;
