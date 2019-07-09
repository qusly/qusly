import styled, { css } from 'styled-components';
import { centerIcon, transparency } from 'wexond-ui';

export const StyledItem = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
`;

export const Icon = styled.div`
  width: 24px;
  height: 24px;
  margin-left: 20px;
  ${centerIcon(24)};

  ${({ icon, opacity }: { icon: string, opacity: number }) => css`
    background-image: url(${icon});
    opacity: ${opacity};
  `}
`;

export const Details = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 12px;
  padding-right: 24px;
`;

export const Name = styled.div`
  font-size: 13px;
  white-space: nowrap;
`;

export const Path = styled(Name)`
  margin-top: 2px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;
