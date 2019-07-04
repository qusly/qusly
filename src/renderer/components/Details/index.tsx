import * as React from 'react';
import { observer } from 'mobx-react';
import * as prettyBytes from 'pretty-bytes';

import store from '~/renderer/store';
import Resizable from '../Resizable';
import DetailsItem from '../DetailsItem';
import { Name, Header, Icon } from './styles';

export default observer(() => {
  const page = store.pages.current;
  if (!page) return null;

  const file = page.focusedFile;
  const { icon, opacity } = store.favicons.get(file);

  return (
    <Resizable
      pos="left"
      style={{
        borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
      }}
    >
      {file && (
        <>
          <Header>
            <Icon icon={icon} opacity={opacity} />
            <Name>{file.name}</Name>
          </Header>
          <DetailsItem property="Location" value="/var/www/" />
          <DetailsItem property="Size" value={prettyBytes(file.size)} />
          <DetailsItem property="Modified" value={file.date.toDateString()} />
          <DetailsItem property="Owner" value={file.user} />
          <DetailsItem property="Group" value={file.group} />
        </>
      )}
    </Resizable>
  );
});
