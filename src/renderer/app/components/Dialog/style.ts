import styled, { css } from 'styled-components';

import { CARD_SHADOW, EASING_FUNCTION } from '../../constants';
import { robotoMedium, noUserSelect, robotoBold } from '~/renderer/mixins';

export const StyledDialog = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.72);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  opacity: 0;
  pointer-events: none;
  will-change: opacity;

  ${({ visible }: { visible: boolean }) => css`
    ${visible &&
      css`
        opacity: 1;
        pointer-events: auto;
        transition: 0.15s opacity;
      `}
  `}
`;

export const Container = styled.div`
  width: 100%;
  max-width: 344px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  overflow: hidden;
  box-shadow: ${CARD_SHADOW};
  will-change: margin-top;
  transition: 0.15s ${EASING_FUNCTION} margin-top;

  ${({ visible }: { visible: boolean }) => css`
    margin-top: ${visible ? 0 : -12}px;
  `};
`;

export const Title = styled.div`
  font-size: 20px;
  padding-bottom: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
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
    opacity: 0.08;
  }
`;

export const SubmitButton = styled(Button)`
  color: #fff;
  background-color: #2196f3;

  &::before {
    background-color: #fff;
  }
`;
