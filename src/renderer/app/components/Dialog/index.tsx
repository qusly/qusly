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

const Item = observer(() => {
  const { title, fields } = store.dialog.data;

  const handleEnter = React.useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      store.dialog.hide('save');
    }
  }, []);

  React.useLayoutEffect(() => {
    const { data, fieldsMap } = store.dialog;

    if (data) {
      data.onMount(fieldsMap);
    }

    return () => {
      if (data.onUnmount) {
        data.onUnmount(fieldsMap);
      }
    };
  }, []);

  return (
    <>
      <Title>{title}</Title>
      {fields.map(r => {
        if (r.type === 'input') {
          return (
            <Input
              key={r.label}
              ref={ref => (store.dialog.fieldsMap[r.label] = ref)}
              placeholder={r.placeholder}
              defaultValue={r.value}
              onKeyDown={r.saveOnEnter ? handleEnter : undefined}
            />
          );
        }
        return null;
      })}
      <Buttons>
        <Button onClick={() => store.dialog.hide()}>Cancel</Button>
        <OkButton onClick={() => store.dialog.hide('save')}>Save</OkButton>
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
