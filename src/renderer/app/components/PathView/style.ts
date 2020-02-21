import styled from 'styled-components';

import { robotoMedium } from '~/renderer/mixins';

export const StyledPathView = styled.div`
  width: 100%;
  height: 30px;
  margin-left: 10px;
  overflow: hidden;
  cursor: text;
  position: relative;
  border-radius: 4px;
  background-color: #fff;
  background-color: #f5f5f5;
`;

export const Folders = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const Folder = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 300;
  padding-left: 4px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.54);

  &:hover {
    color: #000;
  }

  &:first-child {
    padding-left: 12px;
  }

  &:last-child {
    color: #000;
    ${robotoMedium()};
  }

  &:not(:first-child):not(:last-child):after {
    content: '/';
    padding-left: 4px;
  }
`;
