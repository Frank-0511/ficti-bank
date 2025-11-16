/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_FACILIZA: string;
  readonly VITE_TOKEN_FACILIZA: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// CSS Modules
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
