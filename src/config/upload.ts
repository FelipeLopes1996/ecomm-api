import multer, { StorageEngine } from 'multer';
import path from 'path';
import crypto from 'crypto';

interface IUploadConfig {
  driver: 's3' | 'disk';
  tempFolder: string;
  directory: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    aws: {
      bucket: string;
    };
  };
}

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads');
const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  directory: uploadFolder,
  tempFolder,
  multer: {
    storage: multer.diskStorage({
      destination: uploadFolder,
      filename(request, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');

        const filename = `${fileHash}-${file.originalname}`;

        callback(null, filename);
      },
    }),
  },
  config: {
    aws: {
      bucket: 'api-vendas',
    },
  },
} as IUploadConfig;

// export default {
//   directory: uploadFolder,
//   tempFolder,
//   storage: multer.diskStorage({
//     destination: uploadFolder,
//     filename(request, file, callback) {
//       const fileHash = crypto.randomBytes(10).toString('hex');

//       const filename = `${fileHash}-${file.originalname}`;

//       callback(null, filename);
//     },
//   }),
// };
