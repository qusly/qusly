import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import {
  StyledPathView,
  StyledLabel,
  StyledChevron,
  StyledInput,
} from './styles';

const onDoubleClick = () => (store.pathViewStore.inputVisible = true);

const mockPath = ['home', 'documents'];

const Label = ({ chevron, children }: { chevron: boolean; children: any }) => (
  <React.Fragment>
    <StyledLabel onDoubleClick={e => e.stopPropagation()}>
      {children}
    </StyledLabel>
    {chevron && <StyledChevron />}
  </React.Fragment>
);

export default observer(() => {
  const { inputVisible } = store.pathViewStore;

  return (
    <StyledPathView onDoubleClick={onDoubleClick}>
      {mockPath.map((item, index) => (
        <Label key={index} chevron={index < mockPath.length - 1}>
          {item}
        </Label>
      ))}
      <StyledInput
        visible={inputVisible}
        onMouseDown={e => e.stopPropagation()}
        defaultValue="/home/documents"
      />
    </StyledPathView>
  );
});
