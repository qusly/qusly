import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { Input } from '~/renderer/components/Input';
import {
  StyledDialog,
  Container,
  Title,
  Buttons,
  Button,
  OkButton,
} from './style';
import { IDialogFieldsMap } from '~/renderer/interfaces';

const Item = observer(() => {
  const { data } = store.dialog;

  const fields = React.useRef<IDialogFieldsMap>({});

  const onSave = React.useCallback(() => {
    store.dialog.onSave(fields.current);
  }, []);

  React.useLayoutEffect(() => {
    if (data) {
      data.onMount(fields.current);
    }

    return () => {
      if (data.onUnmount) {
        data.onUnmount(fields.current);
      }
    };
  }, [data]);

  return (
    <>
      <Title>{data.title}</Title>
      {data.fields.map(r => {
        if (r.type === 'input') {
          return (
            <Input
              key={r.label}
              defaultValue={r.value}
              ref={ref => (fields.current[r.label] = ref)}
            />
          );
        }
        return null;
      })}
      <Buttons>
        <Button onClick={store.dialog.onCancel}>Cancel</Button>
        <OkButton onClick={onSave}>Save</OkButton>
      </Buttons>
    </>
  );
});

export const Dialog = observer(() => {
  const { visible } = store.dialog;

  const onContainerClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <StyledDialog visible={visible} onClick={store.dialog.onCancel}>
      {visible && (
        <Container onClick={onContainerClick}>
          <Item />
        </Container>
      )}
    </StyledDialog>
  );
});
