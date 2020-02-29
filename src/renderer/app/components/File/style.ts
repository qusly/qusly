import styled, { css } from 'styled-components';

import { centerIcon, customInput, robotoBold } from '~/renderer/mixins';
import { PRIMARY_COLOR } from '../../constants';

export const StyledFileBase = css`
  height: fit-content;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 8px;
`;

export const StyledFile = styled.div`
  border-radius: 4px;
  transition: 0.1s background-color;
  ${StyledFileBase};
  position: relative;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }

  &.selected {
    background-color: rgba(0, 0, 0, 0.08);
  }

  ${({ cut }: { cut: boolean }) => css`
    ${cut &&
      css`
        border: 1px dashed #000;
        opacity: 0.79;
      `}
  `}
`;

export const Icon = styled.div`
  width: 32px;
  height: 32px;
  margin: 8px 0px;
  z-index: 1;
  ${centerIcon()};
`;

export const LabelContainer = styled.div`
  width: 100%;
  position: relative;
`;

export const Label = styled.div`
  width: 100%;
  padding: 0px 8px;
  text-align: center;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  border: 1px solid ${PRIMARY_COLOR};
`;
