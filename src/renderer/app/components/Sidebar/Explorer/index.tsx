import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { ITreeItem } from '~/interfaces';
import store from '~/renderer/app/store';
import { StyledPage, Header, Content } from '../style';
import { StyledItem, Label, ExpandIcon, Icon } from './style';

const onItemClick = (data: ITreeItem) => () => {
  store.pages.current.path.push(data.path);
}

const onExpandClick = (data: ITreeItem) => (e: React.MouseEvent) => {
  e.stopPropagation();

  const session = store.sessions.current;

  session.tree.fetch(data);
  data.expanded = !data.expanded;
}

const onContextMenu = (data: ITreeItem) => () => {
  store.contextMenu.focusedExplorerItem = data;
  store.contextMenu.show('explorer');
}

const Item = observer(({ data, depth }: { data: ITreeItem, depth: number }) => {
  const { file, expanded } = data;

  return (
    <>
      <StyledItem onClick={onItemClick(data)} onContextMenu={onContextMenu(data)} style={{ paddingLeft: depth * 16 }}>
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
    <StyledPage visible={store.activitybar.content === 'explorer'}>
      <Header>Explorer</Header>
      <Content>
        {session.tree.items.map(item => (
          <Item key={item.path} data={item} depth={0} />
        ))}
      </Content>
    </StyledPage>
  );
});
