import styled, { css } from 'styled-components';
import { centerIcon, transparency } from 'wexond-ui';
import { icons } from '~/renderer/constants';

export const Header = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 24px;
  align-items: flex-start;
`;

export const Icon = styled.div`
  min-width: 24px;
  min-height: 24px;
  ${centerIcon(24)}

  ${({ icon, opacity }: { icon: string, opacity: number }) => css`
    background-image: url(${icon});
    opacity: ${opacity};
  `}
`;

export const Name = styled.div`
  font-size: 18px;
  margin-left: 12px;
  overflow: hidden;
`;

export const Close = styled.div`
  min-width: 20px;
  min-height: 20px;
  margin-left: auto;
  background-image: url(${icons.close});
  cursor: pointer;
  opacity: ${transparency.icons.inactive};
  transition: 0.15s opacity;
  ${centerIcon(20)};

  &:hover {
    opacity: 1;
  }
`;
