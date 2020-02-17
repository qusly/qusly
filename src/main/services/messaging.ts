import { ipcMain } from 'electron';
import { IProtocol } from 'qusly-core';

import { AppWindow } from '../windows/';
import { ISite } from '~/interfaces';
import { getIcon } from '../utils/icons';

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

  ipcMain.on('get-icons', async (e, list: string[], id: string) => {
    const promises = list.map(ext => getIcon(ext));
    const data = await Promise.all(promises);
    const icons: { [key: string]: string } = {};

    data.forEach(({ ext, icon }) => {
      icons[ext] = icon;
    });

    appWindow.instance.webContents.send(`get-icons-${id}`, icons);
  });
};
