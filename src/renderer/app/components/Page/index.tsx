import React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';

export const Page = observer(() => {
  const page = store.pages.selected;

  return (
    <>
      <div>
        page id: {page?.id}
        session id:{page?.session?.config?.id}
      </div>
    </>
  );
});
