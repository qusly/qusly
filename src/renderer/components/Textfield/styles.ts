import styled, { css } from 'styled-components';

import { robotoRegular, coloredCursor, centerVertical, robotoMedium } from '~/renderer/mixins';
import { transparency, EASING_FUNCTION } from '~/renderer/constants';

export const StyledTextfield = styled.div`
  width: 280px;
  position: relative;
  border-top-right-radius: 4px;
  border-top-left-radius: 4px;
  overflow: hidden;
  background-color: #f5f5f5;
  margin: 64px;
  cursor: text;
  user-select: none;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  font-size: 16px;
  color: #000;
  padding: 0px 12px;
  border: none;
  outline: none;
  background-color: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.42);
  user-select: auto;
  ${robotoRegular()};

  &::placeholder {
    text-shadow: 0px 0px 0px rgba(0, 0, 0, ${transparency.text.medium});
  }

  ${({ color, isLabel }: { color: string, isLabel: boolean }) => css`
    padding-top: ${isLabel ? 12 : 0}px;
    ${coloredCursor(color)}
  `}
`;

interface LabelProps {
  activated: boolean;
  focused: boolean;
  color: string;
}

export const Label = styled.div`
  left: 12px;
  position: absolute;
  transition: 0.2s font-size, 0.2s color, 0.2s margin-top;
  transition-timing-function: ${EASING_FUNCTION};
  ${centerVertical()};

  ${({ activated, focused, color }: LabelProps) => css`
    font-size: ${activated ? 12 : 16}px;
    margin-top: ${activated ? -12 : 0}px;
    color: ${focused ? color : `rgba(0, 0, 0, ${transparency.text.medium})`};
    ${activated ? robotoMedium() : robotoRegular()};
  `}
`;

export const Indicator = styled.div`
  height: 2px;
  margin-top: -2px;
  margin-left: auto;
  margin-right: auto;
  transition: 0.2s width ${EASING_FUNCTION};

  ${({ focused, color }: { focused: boolean, color: string }) => css`
    width: ${focused ? 100 : 0}%;
    background-color: ${color};
  `}
`;
