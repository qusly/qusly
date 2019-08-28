import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { ITreeItem } from '~/interfaces';
import store from '~/renderer/app/store';
import { Page } from '..';
import { StyledItem, Label, ExpandIcon, Icon } from './style';

const onExpandClick = (data: ITreeItem) => () => {
  if (!data.children.length) {
    const session = store.sessions.current;
    session.tree.init(data);
  }

  data.expanded = !data.expanded;
}

const Item = observer(({ data, depth }: { data: ITreeItem, depth: number }) => {
  const { file } = data;

  return (
    <>
      <StyledItem style={{ paddingLeft: depth * 30 }}>
        <ExpandIcon onClick={onExpandClick(data)} expanded={false} />
        <Icon />
        <Label>{file.name}</Label>
      </StyledItem>
      {data.children.map(item => (
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
