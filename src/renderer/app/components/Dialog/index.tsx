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
import { IDialogFieldsMap, IDialogData } from '~/renderer/interfaces';

const Item = ({ data }: { data: IDialogData }) => {
  const fields = React.useRef<IDialogFieldsMap>({});

  React.useLayoutEffect(() => {
    if (data) {
      data.onMount(fields.current);
    }
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
        <Button>Cancel</Button>
        <OkButton>Save</OkButton>
      </Buttons>
    </>
  );
};

export const Dialog = observer(() => {
  const { visible, data } = store.dialog;

  const onClick = React.useCallback(() => {
    store.dialog.visible = false;
  }, []);

  const onContainerClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <StyledDialog visible={visible} onClick={onClick}>
      {visible && (
        <Container onClick={onContainerClick}>
          <Item data={data} />
        </Container>
      )}
    </StyledDialog>
  );
});
