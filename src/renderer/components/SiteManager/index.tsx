import * as React from 'react';

import SiteItem from '../SiteItem';
import { Pagebar, PageTitle, Add } from './styles';

export default () => (
  <React.Fragment>
    <Pagebar>
      <PageTitle>Site manager</PageTitle>
      <Add />
    </Pagebar>
    <SiteItem label="wexond.net" user="root" />
    <SiteItem label="qusly.app" user="root" />
    <SiteItem label="mystore.j.pl" user="admin" />
    <SiteItem label="my vps" user="root" />
  </React.Fragment>
);
