import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ITransferClientItem } from 'qusly-core';
import { basename } from 'path';
import * as prettyByte from 'pretty-bytes';

import store from '~/renderer/app/store';
import { Button } from '~/renderer/components/Button';
import { Progressbar } from '~/renderer/components/Progressbar';
import { StyledItem, Icon, Container, Name, Label, Buttons } from './style';

const TransferDetails = observer(({ data }: { data: ITransferClientItem }) => {
  const speed = prettyByte(data.speed);
  const buffered = prettyByte(data.buffered);
  const size = prettyByte(data.size);
  const value = Math.round(data.buffered / (data.size || 1) * 100);

  return (
    <>
      <Label style={{ marginTop: 16 }}>{speed}/s - {buffered} of {size}, {data.eta}s left</Label>
      <Progressbar value={value} style={{ width: '100%', marginTop: 8 }} />
      <Buttons>
        <Button label='Pause' type='outlined' color='#2196F3' />
        <Button label='Cancel' type='outlined' color='#2196F3' />
      </Buttons>
    </>
  );
});

export const Item = observer(({ data }: { data: ITransferClientItem }) => {
  const { icon, opacity } = store.icons.getPathIcon(data.remotePath) // todo;
  const filename = basename(data.remotePath);

  return (
    <StyledItem>
      <Icon icon={icon} opacity={opacity} />
      <Container>
        <Name>{filename}</Name>
        <Label>{data.remotePath}</Label>
        {data.status === 'transfering' && <TransferDetails data={data} />}
      </Container>
    </StyledItem >
  );
});
