import * as React from 'react';
import { observer } from 'mobx-react';

import store from '~/renderer/store';
import { Pagebar, PageTitle } from '../MenuPage/styles';

export default observer(() => {
  return (
    <React.Fragment>
      <Pagebar>
        <PageTitle>File transfers</PageTitle>
      </Pagebar>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea ab deserunt,
      enim ipsa dicta ipsum porro nemo recusandae cumque distinctio tenetur
      accusamus molestias deleniti consectetur maxime voluptates dignissimos,
      neque impedit.
    </React.Fragment>
  );
});
