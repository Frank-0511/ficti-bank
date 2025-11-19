import '@/styles/globals.css';
import '@/styles/nprogress.css';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-react-table/styles.css';

import ReactDOM from 'react-dom/client';
import { App } from './App';

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { initMSW } = await import('../lib/mocks/browser');
    await initMSW();
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
});
