import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Input } from '~/renderer/components/Input';
import { DialogContainer } from '..';
import { Title, Content } from '../style';
import { Dropdown, DropdownItem } from '~/renderer/components/Dropdown';

export const AddSite = observer(() => {
  return (
    <DialogContainer content='add-site'>
      <Title>New site</Title>
      <Content style={{ height: 128 }}>
        <Dropdown defaultValue='second'>
          <DropdownItem value='first'>First item</DropdownItem>
          <DropdownItem value='second'>Second item</DropdownItem>
          <DropdownItem value='third'>Third item</DropdownItem>
        </Dropdown>
      </Content>
    </DialogContainer>
  );
});

/*
        <Input placeholder='Title (optional)' />
        <div style={{ width: 100, height: 128 }} />
        */
