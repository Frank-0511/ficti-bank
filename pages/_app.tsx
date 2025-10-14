import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-react-table/styles.css';
import '../styles/globals.css';
import '../styles/nprogress.css';

import { CloseAccountModal, OpenAccountModal, RegisterClientModal } from '@/features/dashboard';
import { LoginModal, RouteProgressBar } from '@/shared/components';

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > 0) {
        document.documentElement.setAttribute('data-scrolled', 'true');
      } else {
        document.documentElement.removeAttribute('data-scrolled');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
              registerClient: RegisterClientModal,
              openAccount: OpenAccountModal,
              closeAccount: CloseAccountModal,
            }}
            modalProps={{
              overlayProps: {
                backgroundOpacity: 0.6,
                blur: 4,
              },
              transitionProps: {
                transition: 'fade',
                duration: 300,
                timingFunction: 'ease-in-out',
              },
            }}
          >
            <RouteProgressBar />
            <Notifications />
            <Component {...pageProps} />
          </ModalsProvider>
        </MantineProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
