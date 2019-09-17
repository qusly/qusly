import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Input } from '~/renderer/components/Input';
import { DialogContainer } from '..';
import { Title, Content } from '../style';

export const AddSite = observer(() => {
  return (
    <DialogContainer content='add-site'>
      <Title>New site</Title>
      <Content style={{ height: 128 }}>
        <Input placeholder='Title (optional)' />
      </Content>
    </DialogContainer>
  );
});
