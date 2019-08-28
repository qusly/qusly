import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { ITreeItem } from '~/interfaces';
import store from '~/renderer/app/store';
import { Page } from '..';
import { StyledItem, Label, ExpandIcon, Icon } from './style';

const onExpandClick = (data: ITreeItem) => () => {
  const session = store.sessions.current;

  session.tree.fetch(data);
  data.expanded = !data.expanded;
}

const Item = observer(({ data, depth }: { data: ITreeItem, depth: number }) => {
  const { file, expanded } = data;

  return (
    <>
      <StyledItem style={{ paddingLeft: depth * 16 }}>
        <ExpandIcon onClick={onExpandClick(data)} expanded={expanded} />
        <Icon />
        <Label>{file.name}</Label>
      </StyledItem>
      {expanded && data.children.map(item => (
        <Item key={item.path} data={item} depth={depth + 1} />
      ))}
    </>
  );
});

export const Explorer = observer(() => {
  const session = store.sessions.current;
  if (!session) return null;

  return (
    <Page title='Explorer' content='explorer'>
      {session.tree.items.map(item => (
        <Item key={item.path} data={item} depth={0} />
      ))}
    </Page>
  );
});
