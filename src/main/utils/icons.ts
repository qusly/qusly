import { promises as fs } from 'fs';
import { resolve } from 'path';
import { app } from 'electron';
import { makeId } from 'qusly-core';

export const getIcon = async (ext: string) => {
  const tempPath = app.getPath('temp');
  const filePath = resolve(tempPath, `${makeId(16)}.${ext}`);

  await fs.writeFile(filePath, undefined);

  let data: Electron.NativeImage;

  try {
    data = await app.getFileIcon(filePath, { size: 'normal' });
  } catch (error) {}

  await fs.unlink(filePath);

  return { ext, data: data.toDataURL() };
};
