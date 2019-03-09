import * as React from 'react';

import { Toolbar } from '../Toolbar';
import store from '~/renderer/store';

export default class App extends React.Component {
  public onClick = () => {
    store.tabsStore.addTab(0, 'Tab');
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar />
        <div onClick={this.onClick}>Add</div>
      </React.Fragment>
    );
  }
}
