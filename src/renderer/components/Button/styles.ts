
import styled, { css } from 'styled-components';
import { button, robotoMedium } from 'wexond-ui';

interface StyledButtonProps {
  background: string;
  foreground: string;
  type?: 'contained' | 'outlined';
}

export const StyledButton = styled.div`
  width: fit-content;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 4px;
  padding: 0px 12px;
  position: relative;
  cursor: pointer;

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0;
    position: absolute;
    will-change: opacity;
    transition: 0.15s opacity;
  }

  &:hover::before {
    opacity: 0.12;
  }

  ${({ background, foreground, type }: StyledButtonProps) => css`
    color: ${foreground};
    border: ${type === 'outlined' ? `1px solid ${background}` : 'unset'};
    background-color: ${type === 'outlined' ? 'transparent' : background};

    &::before {
      background-color: ${foreground};
    }
  `};
`;

export const StyledLabel = styled.div`
  z-index: 1;
  font-size: 13px;
  pointer-events: none;
  ${robotoMedium()};
`;
