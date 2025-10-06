import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { initializeMockData } from './init';

export const worker =
  typeof window !== 'undefined' ? setupWorker(...handlers) : ({} as ReturnType<typeof setupWorker>);

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  initializeMockData();

  worker.start({
    onUnhandledRequest: 'warn',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  });
}
