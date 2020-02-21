import React from 'react';

import store from './';

export class AddTabStore {
  public left = 0;

  public ref = React.createRef<HTMLDivElement>();

  public setLeft(left: number, animation: boolean) {
    store.tabs.animateProperty('x', this.ref.current, left, animation);

    this.left = left;
  }

  public onClick = () => {
    const session = store.sessions.current;

    if (session) {
      store.tabs.addTab({
        active: true,
        config: session.config,
      });
    }
  };
}
