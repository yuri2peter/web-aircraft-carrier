export const IS_PROD = import.meta.env.PROD;
export const APP_NAME = import.meta.env.FRONTEND_APP_NAME;
export const SERVER_ORIGIN = IS_PROD ? '' : 'http://localhost:3000';
export const USE_SOCKET = false;
