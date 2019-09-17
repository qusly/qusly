import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { DialogContainer } from '..';
import { Title, Content } from '../style';

export const AddSite = observer(() => {
  return (
    <DialogContainer content='add-site'>
      <Title>New site</Title>
      <Content>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius natus est eos sed, repellat debitis officia animi maiores sint earum labore, in, doloremque repudiandae fugiat iusto ipsa necessitatibus cum consequatur?
      </Content>
    </DialogContainer>
  );
});
