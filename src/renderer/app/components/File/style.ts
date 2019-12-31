import styled, { css } from 'styled-components';

import { icons } from '~/renderer/constants';
import { centerIcon, robotoRegular, customInput } from '~/renderer/mixins';

interface Props {
  selected: boolean;
  cut: boolean;
}

export const StyledFile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0px 16px 8px 16px;
  position: relative;
  border-radius: 6px;

  ${({ selected, cut }: Props) => css`
    background-color: ${selected ? 'rgba(98, 0, 234, 0.08)' : 'none'};
    opacity: ${cut ? 0.48 : 1};
    border: ${selected
      ? '1px solid rgba(98, 0, 234, 0.12)'
      : '1px solid transparent'};

    ${!cut &&
      css`
        &:hover {
          background-color: ${selected
            ? 'rgba(98, 0, 234, 0.12)'
            : 'rgba(0, 0, 0, 0.08)'};
        }
      `}
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
  z-index: 1;
  font-size: 13px;
  color: #000;
  overflow: hidden;
  position: absolute;
  top: 51px;
  left: -1px;
  text-align: center;
  ${customInput()};
  border: 1px solid #eee;

  ${({ visible }: { visible: boolean }) => css`
    display: ${visible ? 'block' : 'none'};
  `}
`;
