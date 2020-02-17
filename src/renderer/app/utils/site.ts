import { ipcRenderer } from 'electron';

import { ISite } from '~/interfaces';

export const getDevSiteConfig = (): Promise<ISite> => {
  return new Promise(resolve => {
    if (process.env.ENV !== 'dev') return resolve();

    ipcRenderer.once(`get-dev-site-config`, (e, site: ISite) => {
      resolve(site);
    });

    ipcRenderer.send('get-dev-site-config');
  });
};
