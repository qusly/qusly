import styled, { css } from 'styled-components';

import { transparency } from '~/renderer/constants';
import { centerIcon, robotoMedium } from '~/renderer/mixins';

export const StyledItem = styled.div`
  width: 100%;
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
  height: 32px;
  ${centerIcon(32)};

  ${({ icon, opacity }: { icon: string, opacity: number }) => css`
    background-image: url(${icon});
    opacity: ${opacity};
  `}
`;

export const Details = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid rgba(0, 0, 0, ${transparency.dividers});
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
