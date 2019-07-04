import styled, { css } from 'styled-components';
import { robotoMedium, centerIcon } from 'wexond-ui';

export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin-top: 8px;
`;

export const Icon = styled.div`
  width: 24px;
  height: 24px;
  ${centerIcon(24)}

  ${({ icon, opacity }: { icon: string, opacity: number }) => css`
    background-image: url(${icon});
    opacity: ${opacity};
  `}
`;

export const Name = styled.div`
  font-size: 18px;
  margin-left: 12px;
  ${robotoMedium()};
`;
