import styled, { css } from 'styled-components';
import { shadows, centerIcon, robotoRegular, robotoMedium } from 'wexond-ui';

export const StyledThumb = styled.div`
  width: fit-content;
  max-width: 164px;
  height: 48px;
  border-radius: 8px;
  background-color: #fff;
  position: absolute;
  align-items: center;
  padding: 0px 12px;
  pointer-events: none;
  box-shadow: ${shadows(3)};

  ${({ visible }: { visible: boolean }) => css`
    display: ${visible ? 'flex' : 'none'};
  `}
`;

export const Icon = styled.div`
  min-width: 24px;
  min-height: 24px;
  ${centerIcon(24)};

  ${({ icon, opacity }: { icon: string, opacity: number }) => css`
    background-image: url(${icon});
    opacity: ${opacity};
  `}
`;

export const Title = styled.div`
  margin-left: 8px;
  font-size: 13px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  ${robotoRegular()};
`;

export const Counter = styled.div`
  width: 24px;
  height: 24px;
  background-color: #F44336;
  color: #fff;
  display: flex;
  font-size: 13px;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  position: absolute;
  top: -12px;
  left: calc(100% - 12px);
  ${robotoMedium()};
`;
