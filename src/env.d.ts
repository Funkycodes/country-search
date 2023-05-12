/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_ROOT: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
