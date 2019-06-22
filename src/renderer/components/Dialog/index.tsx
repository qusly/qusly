import * as React from 'react';
import styled, { css } from 'styled-components';
import { robotoRegular, robotoMedium } from 'wexond-ui';

import store from '../../store';
import { Button } from '../Button';

const onHideClick = () => store.overlay.hide();

export const CloseButton = () => {
  return (
    <Button background="transparent" foreground="#3F51B5" onClick={onHideClick}>
      CLOSE
    </Button>
  );
};

export const Dialog = styled.div`
  width: 100%;
  max-width: 512px;
  height: fit-content;
  position: fixed;
  background-color: #fff;
  border-radius: 8px;
  padding-bottom: 8px;
  ${robotoRegular()};

  ${({ visible }: { visible: boolean }) => css`
    pointer-events: ${visible ? 'auto' : 'none'};
  `}
`;

export const Title = styled.div`
  padding: 16px 16px 8px 16px;
  font-size: 16px;
  ${robotoMedium()};
`;

export const Content = styled.div`
  padding: 8px 16px 0px 16px;
`;

export const Buttons = styled.div`
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 12px;
  padding-right: 8px;

  & > * {
    margin-right: 4px;
  }
`;
