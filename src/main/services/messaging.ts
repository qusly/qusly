import { ipcMain } from 'electron';
import { IProtocol } from 'qusly-core';

import { AppWindow } from '../app-window';
import { ISite } from '~/interfaces';
import { makeId } from '~/utils';

export const runMessagingService = (appWindow: AppWindow) => {
  ipcMain.on(`get-testing-site`, (e) => {
    const { HOSTNAME,
      USER,
      PASSWORD,
      PROTOCOL,
      PORT,
      ENABLED } = process.env;

    const site: ISite = {
      _id: makeId(32),
      title: HOSTNAME,
      host: HOSTNAME,
      password: PASSWORD,
      user: USER,
      protocol: PROTOCOL as IProtocol,
      port: parseInt(PORT),
    };

    e.returnValue = ENABLED === 'true' ? site : null;
  });
};
