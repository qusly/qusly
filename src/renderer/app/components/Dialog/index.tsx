import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { Input } from '~/renderer/components/Input';
import {
  Background,
  StyledDialog,
  Title,
  Buttons,
  Button,
  OkButton,
} from './style';

export const Dialog = observer(() => {
  const { visible, data } = store.dialog;

  const onBackgroundClick = React.useCallback(() => {
    store.dialog.visible = false;
  }, []);

  const onClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <Background visible={visible} onClick={onBackgroundClick}>
      {visible && (
        <StyledDialog onClick={onClick}>
          <Title>{data.title}</Title>
          {data.fields.map(r => {
            if (r.type === 'input') {
              return <Input key={r.label} defaultValue={r.value} />;
            }
            return null;
          })}
          <Buttons>
            <Button>Cancel</Button>
            <OkButton>Save</OkButton>
          </Buttons>
        </StyledDialog>
      )}
    </Background>
  );
});
