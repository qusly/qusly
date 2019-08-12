import { ipcRenderer } from 'electron';
import * as React from 'react';
import { render } from 'react-dom';

import App from './components/App';

import './style.css'

ipcRenderer.setMaxListeners(0);

render(<App />, document.getElementById('app'));
