import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { Button } from '../Button';
import { OverlayContent } from '~/renderer/store/overlay';
import { StyledDialog, Title, Content, Buttons } from './styles';

const onHideClick = () => store.overlay.hide();

const onClick = (e: React.MouseEvent<any>) => {
  e.stopPropagation();
};

export default observer(
  ({
    title,
    type,
    children,
  }: {
    title: string;
    type: OverlayContent;
    children?: any;
  }) => {
    return (
      <StyledDialog visible={store.overlay.content === type} onClick={onClick}>
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
