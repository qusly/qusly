import { ipcMain } from 'electron';
import { IProtocol } from 'qusly-core';

import { AppWindow } from '../app-window';
import { ISite } from '~/interfaces';
import { makeId } from '~/utils';
import { getIcon } from '../utils/icons';

export const runMessagingService = (appWindow: AppWindow) => {
  ipcMain.on(`get-testing-site`, (e, id: string) => {
    const { HOSTNAME, USER, PASSWORD, PROTOCOL, PORT, ENABLED } = process.env;

    const site: ISite = {
      _id: makeId(32),
      title: HOSTNAME,
      host: HOSTNAME,
      password: PASSWORD,
      user: USER,
      protocol: PROTOCOL as IProtocol,
      port: parseInt(PORT),
    };

    appWindow.webContents.send(
      `get-testing-site-${id}`,
      ENABLED === 'true' ? site : null,
    );
  });

  ipcMain.on('get-icons', async (e, list: string[], id: string) => {
    const promises = list.map(ext => getIcon(ext));
    const data = await Promise.all(promises);
    const icons: { [key: string]: string } = {};

    data.forEach(({ ext, icon }) => {
      icons[ext] = icon;
    });

    appWindow.webContents.send(`get-icons-${id}`, icons);
  });
};
