import * as React from 'react';

import { ITransferSection } from '~/interfaces';
import { Item } from '../Item';
import { StyledSection, Title } from './style';

export const Section = ({ data }: { data: ITransferSection }) => {
  const { title, items } = data;

  return (
    <StyledSection>
      <Title>{title}</Title>
      {items.map(r => (
        <Item key={r.id} data={r} />
      ))}
    </StyledSection>
  );
}
