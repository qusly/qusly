import styled from 'styled-components';

import { robotoRegular } from '~/renderer/mixins';
import { transparency } from '~/renderer/constants';

export const StyledSite = styled.div`
  width: calc(100% - 16px);
  height: 52px;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.15s background-color;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const Label = styled.div`
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  ${robotoRegular()};
`;

export const Description = styled.div`
  font-size: 13px;
  margin-top: 4px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgba(0, 0, 0, ${transparency.text.medium});
`;
