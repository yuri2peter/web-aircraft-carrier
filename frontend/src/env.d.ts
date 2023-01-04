/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly FRONTEND_APP_NAME: string;
  readonly FRONTEND_SERVER_ORIGIN: string;
  readonly FRONTEND_USE_SOCKET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
