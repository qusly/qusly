import styled, { css } from 'styled-components';

import { robotoRegular } from '~/renderer/mixins';

interface Props {
  label: string;
  color?: string;
  background?: string;
  disabled?: boolean;
  type?: 'contained' | 'outlined';
}

export const Button = styled.div`
  min-width: 80px;
  width: fit-content;
  height: 36px;
  padding: 0px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 30px;
  position: relative;
  cursor: pointer;

  ${({ type, label, color, background, disabled }: Props) => css`
    pointer-events: ${disabled ? 'none' : 'auto'};
    opacity: ${disabled ? 0.24 : 1};
    border: ${type === 'outlined'
      ? `1px solid ${background || '#2196F3'}`
      : 'unset'};
    background-color: ${type === 'outlined'
      ? 'transparent'
      : background || '#2196F3'};

    &::before {
      background-color: ${color || '#fff'};
    }

    &::after {
      content: "${label}";
      z-index: 1;
      font-size: 13px;
      pointer-events: none;
      color: ${color || '#fff'};
      ${robotoRegular()};
    }
  `}

  &::before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0;
    position: absolute;
    will-change: opacity;
    transition: 0.2s opacity;
  }

  &:hover::before {
    opacity: 0.12;
  }

  &:active::before {
    opacity: 0.18;
  }
`;
