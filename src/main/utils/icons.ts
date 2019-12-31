import { getExtIcon } from 'electron-ext-icon';

export const getIcon = async (ext: string) => {
  const img = await getExtIcon(ext, { size: 'normal' });
  return { ext, icon: img.toDataURL() };
};
