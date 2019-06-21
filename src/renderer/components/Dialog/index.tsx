import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { Button } from '../Button';
import { StyledDialog, Title, Content, Buttons } from './styles';

const onHideClick = () => store.overlay.hide();

export default observer(
  ({
    title,
    visible,
    children,
  }: {
    title: string;
    visible?: boolean;
    children?: any;
  }) => {
    return (
      <StyledDialog visible={visible}>
        <Title>{title}</Title>
        <Content>{children}</Content>
        <Buttons>
          <Button
            background="transparent"
            foreground="#3F51B5"
            onClick={onHideClick}
          >
            CLOSE
          </Button>
          <Button background="transparent" foreground="#3F51B5">
            ADD
          </Button>
        </Buttons>
      </StyledDialog>
    );
  },
);
