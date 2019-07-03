import styled from 'styled-components';
import { robotoMedium, noButtons } from 'wexond-ui';

export const StyledPage = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  padding-right: 2px;
  padding-bottom: 12px;
  background-color: rgba(0, 0, 0, 0.04);
  ${noButtons()};
`;

export const Pagebar = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
`;

export const PageTitle = styled.div`
  margin-left: 24px;
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  ${robotoMedium()};
`;
