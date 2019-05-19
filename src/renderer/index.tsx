import * as React from 'react';
import { render } from 'react-dom';
import { ipcRenderer } from 'electron';

import App from './components/App';
import { fonts } from './constants';
import store from './store';

ipcRenderer.setMaxListeners(0);

const styleElement = document.createElement('style');

styleElement.textContent = `
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: url(${fonts.robotoLight}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(${fonts.robotoRegular}) format('woff2');
  }

  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url(${fonts.robotoMedium}) format('woff2');
  }
`;

document.head.appendChild(styleElement);

store.tabs.addTab({ active: true });

render(<App />, document.getElementById('app'));
