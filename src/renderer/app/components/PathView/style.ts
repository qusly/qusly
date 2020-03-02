import styled, { css } from 'styled-components';

import { robotoMedium, customInput } from '~/renderer/mixins';
import { PRIMARY_COLOR } from '../../constants';

export const StyledPathView = styled.div`
  width: 100%;
  height: 30px;
  margin-left: 10px;
  overflow: hidden;
  cursor: text;
  position: relative;
  border-radius: 4px;
  background-color: #f5f5f5;

  ${({ inputVisible }: { inputVisible: boolean }) => css`
    ${inputVisible &&
      css`
        box-shadow: 0 0 0 2px ${PRIMARY_COLOR};
      `}
  `}
`;

export const Folders = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const StyledFolder = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  padding-left: 4px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.54);

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
  display: none;
  ${customInput()};
  font-size: 14px;

  ${({ visible }: { visible: boolean }) => css`
    ${visible &&
      css`
        display: block;
        background-color: #fff;
      `}
  `}
`;
