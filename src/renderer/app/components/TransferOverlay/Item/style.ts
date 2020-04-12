import styled, { css } from 'styled-components';
import { transparency } from '~/renderer/constants/transparency';
import { centerIcon } from '~/renderer/mixins/images';
import { singleLine, robotoMedium } from '~/renderer/mixins/typography';
import { icons } from '~/renderer/constants/icons';

export const StyledItem = styled.div`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, ${transparency.dividers});
  border-radius: 6px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  position: relative;
`;

export const Icon = styled.div`
  min-width: 80px;
  height: 32px;
  ${centerIcon(32)};

  ${({ icon, opacity }: { icon: string; opacity: number }) => css`
    background-image: url(${icon});
    opacity: ${opacity};
  `}
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 12px 32px 12px 16px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-left: 1px solid rgba(0, 0, 0, ${transparency.dividers});
`;

export const Name = styled.div`
  font-size: 14px;
  ${singleLine()};
  ${robotoMedium()};
`;

export const Label = styled.div`
  font-size: 14px;
  margin-top: 6px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
  ${singleLine()};
`;

export const Show = styled(Label)`
  margin-top: 8px;
  color: #2196f3;
  cursor: pointer;
`;

export const Buttons = styled.div`
  display: flex;
  margin-top: 16px;

  & > *:not(:first-child) {
    margin-left: 12px;
  }
`;

export const Close = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  background-image: url(${icons.close});
  opacity: ${transparency.icons.inactive};
  position: absolute;
  top: 8px;
  right: 8px;
  ${centerIcon(16)};

  &:hover {
    opacity: 1;
  }
`;
