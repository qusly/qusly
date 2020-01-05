import styled from 'styled-components';
import { singleLine, robotoMedium } from '~/renderer/mixins/typography';
import { transparency } from '~/renderer/constants/transparency';

export const StyledSite = styled.div`
  width: calc(100% - 16px);
  height: 52px;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 6px;
  transition: 0.15s background-color;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const Label = styled.div`
  font-size: 14px;
  ${singleLine()}
  ${robotoMedium()};
`;

export const Description = styled.div`
  font-size: 13px;
  margin-top: 4px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
  ${singleLine()}
`;
