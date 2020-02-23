import styled, { css } from 'styled-components';

import { centerIcon, customInput } from '~/renderer/mixins';
import { FILE_HEIGHT } from '../../constants';

export const StyledFileBase = css`
  height: ${FILE_HEIGHT}px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const StyledFile = styled.div`
  border-radius: 4px;
  transition: 0.1s background-color;
  ${StyledFileBase};

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  &.selected {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;

export const Icon = styled.div`
  width: 32px;
  height: 32px;
  margin: 8px 0px;
  ${centerIcon()};
`;

export const LabelContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const Label = styled.div`
  width: 100%;
  text-overflow: ellipsis;
  padding: 0px 8px;
  overflow: hidden;
  text-align: center;
  font-size: 13px;
`;

export const Input = styled.textarea`
  width: 100%;
  height: calc(100% + 2px);
  overflow: hidden;
  position: absolute;
  text-align: center;
  text-align-last: center;
  top: -1px;
  left: 0px;
  letter-spacing: 0.25px;
  padding: 0px 8px;
  color: #000;
  font-size: 13px;
  z-index: 1;
  ${customInput()};
  background-color: #fff;
  border: 1px solid red;
`;
