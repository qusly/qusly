import * as React from 'react';

import SiteItem from '../SiteItem';
import store from '~/renderer/store';
import { Pagebar, PageTitle, Add } from './styles';

export default () => (
  <React.Fragment>
    <Pagebar>
      <PageTitle>Sites manager</PageTitle>
      <Add />
    </Pagebar>
    {store.sites.items.map(item => (
      <SiteItem data={item} key={item._id} />
    ))}
  </React.Fragment>
);
