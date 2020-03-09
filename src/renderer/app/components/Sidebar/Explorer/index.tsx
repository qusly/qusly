import React from 'react';
import { observer } from 'mobx-react-lite';

import { SidebarPage } from '../';
import { ITreeFolder } from '~/renderer/interfaces';
import store from '~/renderer/app/store';
import { Header, Content } from '../style';
import { StyledFolder, ExpandIcon, Icon, Label } from './style';

interface IFolderProps {
  data: ITreeFolder;
  depth: number;
}

const Folder = observer(({ data, depth }: IFolderProps) => {
  const onClick = React.useCallback(() => {
    if (!data.expanded) {
      store.sessions.current.tree.fetch(data);
    }

    data.expanded = !data.expanded;
  }, [data]);

  return (
    <>
      <StyledFolder onClick={onClick} style={{ paddingLeft: depth * 16 + 16 }}>
        <ExpandIcon expanded={data.expanded} />
        <Icon />
        <Label>{data.path}</Label>
      </StyledFolder>
      {data.expanded &&
        data?.children?.map(r => (
          <Folder key={r.path} data={r} depth={depth + 1} />
        ))}
    </>
  );
});

export default observer(() => {
  const session = store.sessions.current;

  return (
    <SidebarPage content="explorer">
      <Header>Explorer</Header>
      <Content>
        {session?.tree.items.map(r => (
          <Folder key={r.path} data={r} depth={0} />
        ))}
      </Content>
    </SidebarPage>
  );
});
