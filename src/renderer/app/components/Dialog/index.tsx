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
  SubmitButton,
} from './style';

const onInput = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    store.dialog.hide('save');
  }
};

const onCancelButtonClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  store.dialog.hide();
};

const onSubmitButtonClick = () => {
  store.dialog.hide('save');
};

const Content = observer(() => {
  const data = store.dialog.data;

  React.useLayoutEffect(() => {
    const fieldsMap = store.dialog.fieldsMap;

    if (data?.onMount) {
      data.onMount(fieldsMap);
    }

    requestAnimationFrame(() => {
      if (data?.focusedField) {
        fieldsMap[data.focusedField].focus();
        fieldsMap[data.focusedField].select();
      }
    });

    return () => {
      if (data?.onUnmount) {
        data.onUnmount(fieldsMap);
      }
    };
  }, [data]);

  if (!data || !store.dialog.visible) return null;

  const { title, fields } = data;

  return (
    <>
      <Title>{title}</Title>
      {fields &&
        fields.map(r => {
          if (r.type === 'input') {
            return (
              <Input
                key={r.label}
                ref={ref => (store.dialog.fieldsMap[r.label] = ref)}
                placeholder={r.placeholder}
                defaultValue={r.value}
                onKeyDown={r.saveOnEnter ? onInput : undefined}
              />
            );
          }
          return null;
        })}
      <Buttons>
        <Button onClick={onCancelButtonClick}>
          {data.cancelButton ?? 'Cancel'}
        </Button>
        <SubmitButton onClick={onSubmitButtonClick}>
          {data.submitButton ?? 'Save'}
        </SubmitButton>
      </Buttons>
    </>
  );
});

const onBackgroundClick = () => {
  store.dialog.hide();
};

const onContainerClick = (e: React.MouseEvent) => {
  e.stopPropagation();
};

export const Dialog = observer(() => {
  const { visible } = store.dialog;

  return (
    <StyledDialog visible={visible} onClick={onBackgroundClick}>
      <Container visible={visible} onClick={onContainerClick}>
        <Content />
      </Container>
    </StyledDialog>
  );
});
