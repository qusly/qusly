import { ipcMain } from 'electron';
import { IProtocol } from 'qusly-core';

import { AppWindow } from '../windows/';
import { ISite } from '~/interfaces';
import { getIcon } from '../utils';

export const runMessagingService = (appWindow: AppWindow) => {
  ipcMain.on(`get-dev-site-config`, e => {
    const { HOSTNAME, USER, PASSWORD, PROTOCOL, PORT, ENABLED } = process.env;

    const site: ISite = {
      id: -1,
      title: HOSTNAME,
      host: HOSTNAME,
      password: PASSWORD,
      user: USER,
      protocol: PROTOCOL as IProtocol,
      port: parseInt(PORT),
    };

    e.sender.send(`get-dev-site-config`, ENABLED === 'true' ? site : null);
  });

  ipcMain.handle('get-icons', async (e, list: string[]) => {
    const promises = list.map(ext => getIcon(ext));
    const data = await Promise.all(promises);

    const icons: { [key: string]: string } = {};

    data.forEach(({ ext, data }) => {
      icons[ext] = data;
    });

    return icons;
  });
};
