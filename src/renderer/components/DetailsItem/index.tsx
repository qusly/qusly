import * as React from 'react';

import { StyledItem, Property, Value } from './styles';

export default ({ property, value }: { property: string; value: string }) => {
  return (
    <StyledItem>
      <Property>{property}</Property>
      <Value>{value}</Value>
    </StyledItem>
  );
};
