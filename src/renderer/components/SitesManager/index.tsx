import * as React from 'react';
import { observer } from 'mobx-react';

import SiteItem from '../SiteItem';
import store from '~/renderer/store';
import { Pagebar, PageTitle } from '../Page/styles';
import { Add } from './styles';

const onAddClick = () => store.overlay.show('add-site');

export default observer(() => {
  return (
    <React.Fragment>
      <Pagebar>
        <PageTitle>Sites manager</PageTitle>
        <Add onClick={onAddClick} />
      </Pagebar>
      {store.sites.items.map(item => (
        <SiteItem data={item} key={item._id} />
      ))}
    </React.Fragment>
  );
});
