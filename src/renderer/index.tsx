import * as React from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from 'electron';

import store from './store';
import App from './components/App';

ipcRenderer.setMaxListeners(0);

render(<App />, document.getElementById('app'));
