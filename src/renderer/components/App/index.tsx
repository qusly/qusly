import * as React from 'react';

import { Toolbar } from '../Toolbar';
import store from '~/renderer/store';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Toolbar />
        <button onClick={() => store.tabsStore.addTab('Tab')}>add</button>
      </React.Fragment>
    );
  }
}
