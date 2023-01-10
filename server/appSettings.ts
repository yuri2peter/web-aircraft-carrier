import path from 'path';
import { loadEnvConfig } from '@next/env';

export const IS_PROD = process.env.NODE_ENV === 'production';
export const ROOT_PATH: string = __dirname;

loadEnvConfig(path.resolve(ROOT_PATH, 'env'), !IS_PROD);

export const { PORT } = process.env as unknown as {
  PORT: number;
};
