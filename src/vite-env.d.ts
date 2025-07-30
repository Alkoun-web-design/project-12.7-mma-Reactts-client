/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_UPLOADS_URL: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_MODE: 'development' | 'staging' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}