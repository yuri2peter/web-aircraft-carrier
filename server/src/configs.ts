import fs from 'fs-extra';
import path from 'path';
import dotenv from 'dotenv';
import {
  MAX_UPLOAD_FILE_SIZE as MAX_UPLOAD_FILE_SIZE_DEFAULT,
  DEV_SERVER_PORT,
} from '@local/common/configs';

const envFile = path.join(__dirname, '../.env');
fs.ensureFileSync(envFile);

dotenv.config({ path: envFile });
/*
PORT=
MAX_UPLOAD_FILE_SIZE=
*/

// paths
export const ROOT_PATH: string = path.resolve(__dirname, '../');
export const htmlFrontendPath = path.join(ROOT_PATH, 'html/frontend');
export const htmlResourcesPath = path.join(ROOT_PATH, 'html/resources');
export const htmlResourcesUploadsPath = path.join(htmlResourcesPath, 'uploads');

// env
const env = process.env as unknown as any;
const parseEnvValue = (envName: string, defaultValue: any) => {
  const envValue = env[envName];
  if (envValue === '' || envValue === undefined) {
    return defaultValue;
  }
  return envValue;
};

// configs
export const IS_PROD = process.env.NODE_ENV === 'production';
export const IS_DEV = !IS_PROD;
export const PORT = Number(parseEnvValue('PORT', DEV_SERVER_PORT));
process.env.PORT = String(PORT);
export const MAX_UPLOAD_FILE_SIZE = Number(
  parseEnvValue('MAX_UPLOAD_FILE_SIZE', MAX_UPLOAD_FILE_SIZE_DEFAULT)
);
export const OPEN_BROWSER = Boolean(parseEnvValue('OPEN_BROWSER', false));
