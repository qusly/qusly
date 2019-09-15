import { ISite } from '~/interfaces';

export const formatSiteDescription = ({ protocol, user, host, port }: ISite) => {
  const defaultPort = protocol === 'sftp' ? 22 : 21;
  const portStr = defaultPort !== port ? `:${port}` : '';

  return `${user}@${host}${portStr}`;
}
