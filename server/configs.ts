require('dotenv').config();
const env = process.env as unknown as {
  PORT?: string;
};

export const IS_PROD = process.env.NODE_ENV === 'production';
export const ROOT_PATH: string = __dirname;
export const PORT = Number(env.PORT) || 3000;
