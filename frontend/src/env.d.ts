/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PROD: boolean;
  readonly FRONTEND_APP_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
