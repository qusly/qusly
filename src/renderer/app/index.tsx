import { ipcRenderer } from 'electron';
import * as React from 'react';
import { render } from 'react-dom';

import './style.scss';

import App from './components/App';

ipcRenderer.setMaxListeners(0);

render(<App />, document.getElementById('app'));
