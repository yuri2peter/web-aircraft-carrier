/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly FRONTEND_APP_NAME: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
