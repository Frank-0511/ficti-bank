import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';
import { initializeMockData } from './initData';

export const worker = setupWorker(...handlers);

export async function initMSW() {
  initializeMockData();

  try {
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  } catch (error) {
    console.error('Failed to start worker:', error);
  }
}
