/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly FRONTEND_APP_NAME: string;
  readonly FRONTEND_SERVER_ORIGIN: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
