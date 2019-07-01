import styled, { css } from 'styled-components';
import { centerIcon, robotoRegular } from 'wexond-ui';

import { icons } from '~/renderer/constants';

export const StyledFile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0px 16px 8px 16px;
  border-radius: 4px;
  position: relative;

  ${({ selected }: { selected: boolean }) => css`
    background-color: ${selected ? 'rgba(98, 0, 234, 0.08)' : 'none'};

    border: ${selected
      ? '1px solid rgba(98, 0, 234, 0.12)'
      : '1px solid transparent'};

    &:hover {
      background-color: ${selected
      ? 'rgba(98, 0, 234, 0.12)'
      : 'rgba(0, 0, 0, 0.08)'};
    }
  `}
`;

export const Icon = styled.div`
  width: 48px;
  height: 48px;
  background-image: url(${icons.folder});
  ${centerIcon(32)};

  ${({ icon }: { icon: any }) => css`
    background-image: url(${icon});
  `};
`;

export const Label = styled.div`
  max-width: 100%;
  margin-top: 8px;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Input = styled.textarea`
  width: calc(100% + 2px);
  min-height: calc(100% - 50px); 
  border-radius: 4px;
  background-color: #fff;
  border: 1px solid #eee;
  z-index: 1;
  outline: none;
  font-size: 13px;
  color: #000;
  resize: none;
  overflow: hidden;
  position: absolute;
  top: 51px;
  left: -1px;
  text-align: center;
  ${robotoRegular()};
`;
