/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PROD: boolean;
  readonly FRONTEND_FOO?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
