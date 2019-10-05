import styled, { css } from 'styled-components';

import { centerIcon } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';

export const StyledButton = styled.div`
  width: calc(100% - 16px);
  height: 40px;
  display: flex;
  align-items: center;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  transition: 0.15s background-color;

  &:not(:first-child) {
    margin-top: 6px;
  }

  ${({ selected }: { selected: boolean }) => css`
    color: ${selected ? '#2196F3' : '#000'};

    &::before {
      opacity: ${selected ? 0.06 : 0};
    }
  `}

  &::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #2196F3;
    z-index: 1;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const Icon = styled.div`
  width: 24px;
  height: 24px;
  margin: 0px 8px;
  z-index: 2;
  ${centerIcon(20, true)};

  ${({ icon, selected }: { icon: string, selected: boolean }) => css`
    opacity: ${selected ? 1 : transparency.icons.inactive};
    background: ${selected ? '#2196F3' : '#000'};
    mask-image: url(${icon});
  `}
`;

export const Label = styled.div`
  font-size: 14px;
  z-index: 2;
`;
