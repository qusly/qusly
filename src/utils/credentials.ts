import { ipcRenderer } from 'electron';

export const setPassword = (_id: string, password: string) => {
  return ipcRenderer.invoke('set-password', 'qusly', _id, password);
};

export const getPassword = (_id: string) => {
  return ipcRenderer.invoke('get-password', 'qusly', _id);
};

export const deletePassword = (_id: string) => {
  return ipcRenderer.invoke('delete-password', 'qusly', _id);
};
