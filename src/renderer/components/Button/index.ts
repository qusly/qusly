import styled from 'styled-components';

import { robotoMedium } from '~/renderer/mixins';

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
  transition: 0.15s transform;
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

  &:active {
    transform: scale(0.95);
  }
`;

export const SubmitButton = styled(Button)`
  color: #fff;
  background-color: #2196f3;

  &::before {
    background-color: #fff;
  }
`;
