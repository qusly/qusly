import { setPassword as _setPassword, getPassword as _getPassword, deletePassword as _deletePassword } from 'keytar';

export const setPassword = (_id: string, password: string) => {
  return _setPassword('qusly', `site-${_id}`, password);
}

export const getPassword = (_id: string) => {
  return _getPassword('qusly', `site-${_id}`);
}

export const deletePassword = (_id: string) => {
  return _deletePassword('qusly', `site-${_id}`);
}
