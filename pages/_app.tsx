import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '../styles/globals.css';

import { LoginModal, RegisterModal } from '@/features/auth/modals';
import { CloseAccountModal, OpenAccountModal } from '@/features/dashboard/components';

import '@/lib/mocks/browser';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { cssVariablesResolver, theme } from '@/lib/theme';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <>
      <Head>
        <title>Ficti Bank</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <MantineProvider
          theme={theme}
          cssVariablesResolver={cssVariablesResolver}
          defaultColorScheme="light"
        >
          <ModalsProvider
            modals={{
              login: LoginModal,
              register: RegisterModal,
              openAccount: OpenAccountModal,
              closeAccount: CloseAccountModal,
            }}
          >
            <Notifications />
            <Component {...pageProps} />
          </ModalsProvider>
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
