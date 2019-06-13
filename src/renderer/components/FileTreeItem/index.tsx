import * as React from 'react';
import { observer } from 'mobx-react';

import { TreeItem } from '~/renderer/models';
import {
  StyledTreeItem,
  DropIcon,
  FolderIcon,
  Label,
  ItemsContainer,
} from './styles';

const onClick = (item: TreeItem) => () => {
  if (item.children.length) {
    item.selected = !item.selected;
  }
};

const TreeItem = observer(({ data }: { data: TreeItem }) => {
  return (
    <React.Fragment>
      <StyledTreeItem onClick={onClick(data)}>
        <DropIcon
          visible={data.children.length !== 0}
          selected={data.selected}
        />
        <FolderIcon />
        <Label>{data.name}</Label>
      </StyledTreeItem>
      {data.selected && (
        <ItemsContainer>
          {data.children.map(item => (
            <TreeItem key={item._id} data={item} />
          ))}
        </ItemsContainer>
      )}
    </React.Fragment>
  );
});

export default TreeItem;
