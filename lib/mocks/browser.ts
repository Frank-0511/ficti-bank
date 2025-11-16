// browser.ts
import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { initializeMockData } from './initData';

export const worker = setupWorker(...handlers);

// Solo correr en desarrollo y en navegador
if (process.env.NODE_ENV === 'development') {
  // Inicializa tu data antes de iniciar MSW
  initializeMockData();

  worker.start({
    onUnhandledRequest: 'bypass',
  });
}
