import * as React from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from 'electron';

import store from './store';
import App from './components/App';

ipcRenderer.setMaxListeners(0);

store.tabs.addTab({ active: true });

render(<App />, document.getElementById('app'));
