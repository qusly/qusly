import styled, { css } from 'styled-components';

import { robotoMedium, robotoRegular, customInput } from '~/renderer/mixins';

export const StyledPathView = styled.div`
  width: 100%;
  height: 32px;
  margin-left: 8px;
  overflow: hidden;
  cursor: text;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 4px;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;

  ${({ visible }: { visible: boolean }) => css`
    display: ${visible ? 'flex' : 'none'};
  `}
`;

export const Item = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 300;
  opacity: 0.54;
  margin-right: 4px;
  cursor: pointer;
  ${robotoRegular()};

  &:first-child {
    padding-left: 12px;
  }

  &:not(:first-child):after {
    content: '/';
    margin-left: 4px;
  }

  &:hover {
    opacity: 1;
  }

  &:last-child {
    opacity: 1;
    ${robotoMedium()};

    &:after {
      content: '';
      margin-left: 0;
    }
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  padding: 0px 12px;
  color: #000;
  ${customInput()};

  ${({ visible }: { visible: boolean }) => css`
    display: ${visible ? 'block' : 'none'};
  `}
`;
