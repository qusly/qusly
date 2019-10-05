import styled, { css } from 'styled-components';

import { transparency } from '~/renderer/constants';
import { centerIcon, robotoMedium } from '~/renderer/mixins';

export const StyledItem = styled.div`
  width: 100%;
  height: 108px;
  border: 1px solid rgba(0, 0, 0, ${transparency.dividers});
  border-radius: 6px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }
`;

export const Icon = styled.div`
  width: 80px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, ${transparency.dividers});
  opacity: ${transparency.icons.inactive};
  ${centerIcon(32)};

  ${({ icon }: { icon: string }) => css`
    background-image: url(${icon});
  `}
`;

export const Details = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
`;

export const Name = styled.div`
  font-size: 14px;
  ${robotoMedium()};
`;

export const Path = styled.div`
  font-size: 14px;
  margin-top: 6px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;

export const Show = styled.div`
  font-size: 14px;
  color: #2196F3;
  margin-top: auto;
  margin-bottom: 4px;
  cursor: pointer;
`;
