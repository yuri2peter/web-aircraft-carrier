export const IS_PROD = import.meta.env.PROD;
export const APP_NAME = import.meta.env.FRONTEND_APP_NAME;
export const SERVER_ORIGIN = IS_PROD ? '' : getDefaultServerOrigin();
export const USE_SOCKET = false;

function getDefaultServerOrigin(port = 3000) {
  const { protocol, hostname } = window.location;
  return `${protocol}//${hostname}:${port}`;
}
