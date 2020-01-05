import styled, { css } from 'styled-components';

import { robotoMedium, robotoRegular, customInput } from '~/renderer/mixins';

export const StyledPathView = styled.div`
  width: 100%;
  height: 32px;
  margin-left: 8px;
  overflow: hidden;
  cursor: text;
  position: relative;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.03);

  ${({ inputVisible }: { inputVisible: boolean }) => css`
    box-shadow: ${inputVisible ? `0 0 0 2px #BBDEFB` : 'none'};
  `}

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
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
  padding-left: 4px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.54);
  ${robotoRegular()};

  &:hover {
    color: #000;
  }

  &:first-child {
    padding-left: 12px;
  }

  &:last-child {
    color: #000;
    ${robotoMedium()};
  }

  &:not(:first-child):not(:last-child):after {
    content: '/';
    padding-left: 4px;
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
    background-color: ${visible ? 'white' : 'inherit'};
  `}
`;
