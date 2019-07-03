import styled from 'styled-components';
import { transparency, robotoRegular } from 'wexond-ui';

export const StyledItem = styled.div`
  width: 100%;
  height: 52px;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
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

export const User = styled.div`
  font-size: 13px;
  margin-top: 4px;
  color: rgba(0, 0, 0, ${transparency.text.medium});
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
