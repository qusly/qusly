import styled, { css } from 'styled-components';
import { centerIcon } from 'wexond-ui';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 16px;`;

export const Details = styled.div`
  margin-left: 16px;
`;

export const Icon = styled.div`
  width: 32px;
  height: 32px;
  ${centerIcon(32)};

  ${({ icon, opacity }: { icon: string, opacity: number }) => css`
    background-image: url(${icon});
    opacity: ${opacity};
  `}
`;

export const Name = styled.div`
  font-size: 14px;
`;

export const Size = styled.div`
  font-size: 14px;
`;
