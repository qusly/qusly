import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ITransferItem } from 'qusly-core';
import { basename } from 'path';
import * as prettyByte from 'pretty-bytes';

import store from '~/renderer/app/store';
import { Button } from '~/renderer/components/Button';
import { Progressbar } from '~/renderer/components/Progressbar';
import { StyledItem, Icon, Container, Name, Label, Buttons, Close } from './style';

const onClose = (id: string) => () => {
  store.transfer.remove(id);
}

const TransferDetails = observer(({ data }: { data: ITransferItem }) => {
  const { info } = data;
  const speed = prettyByte(info.speed);
  const buffered = prettyByte(info.buffered);
  const size = prettyByte(info.size);

  return (
    <>
      <Label style={{ marginTop: 16 }}>{speed}/s - {buffered} of {size}, {info.eta}s left</Label>
      <Progressbar value={info.percent} style={{ width: '100%', marginTop: 8 }} />
      <Buttons>
        <Button label='Pause' type='outlined' color='#2196F3' />
        <Button label='Cancel' type='outlined' color='#2196F3' />
      </Buttons>
    </>
  );
});

export const Item = observer(({ data }: { data: ITransferItem }) => {
  const { id, status, info } = data;
  const { remotePath } = info;
  const { icon, opacity } = store.icons.getPathIcon(remotePath) // todo;
  const filename = basename(remotePath);

  return (
    <StyledItem>
      <Icon icon={icon} opacity={opacity} />
      <Container>
        <Name>{filename}</Name>
        <Label>{remotePath}</Label>
        {status === 'transfering' && <TransferDetails data={data} />}
      </Container>
      {status === 'finished' && <Close onClick={onClose(id)} />}
    </StyledItem >
  );
});
