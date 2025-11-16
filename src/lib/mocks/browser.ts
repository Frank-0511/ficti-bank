import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { initializeMockData } from './initData';

export const worker = setupWorker(...handlers);

export async function initMSW() {
  initializeMockData();

  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}
