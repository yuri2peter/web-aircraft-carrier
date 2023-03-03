import path from 'path';
require('dotenv').config();

const env = process.env as unknown as {
  PORT?: string;
};

export const IS_PROD = process.env.NODE_ENV === 'production';
export const ROOT_PATH: string = path.resolve(__dirname, '../');

// PORT
export const PORT = Number(env.PORT) || 3000;
process.env.PORT = String(PORT);
