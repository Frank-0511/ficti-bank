import { worker } from './browser';

export function startMSW() {
  if (typeof window === 'undefined') {
    return;
  }

  // evita inicialización múltiple
  if (!window.__mswInitialized) {
    worker.start({
      onUnhandledRequest: 'bypass',
      // serviceWorker: { url: '/mockServiceWorker.js' }, // descomenta si necesitas ruta custom
      quiet: false, // muestra logs útiles para debugging
    });
    window.__mswInitialized = true;
  }
}

declare global {
  interface Window {
    __mswInitialized?: boolean;
  }
}
