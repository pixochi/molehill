import { createWriteStream } from 'fs';

import { PORT } from 'src/bin/server';

import { UploadedFile } from '../user';

const HOST = 'localhost';

const buildFilePath = (filename) => `http://${HOST}:${PORT}/${filename}`;

export const writeFile = (filePath: string, filename: string, fileStream: any): Promise<UploadedFile> => {
  return new Promise((resolve, reject) => {
    const writeStream = createWriteStream(filePath);

    writeStream.write(fileStream, (err) => {
      if (!err) {
        return resolve({filePath: buildFilePath(filename)});
      }
      return reject({filePath: ''});
    });
  });
};
