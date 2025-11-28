/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ASSISTANT_API_URL: string;
  readonly VITE_CANDIDATE_API_URL: string;
  readonly VITE_API_KEY?: string;
  readonly VITE_ENV: 'development' | 'production';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
