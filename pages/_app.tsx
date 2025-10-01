// pages/_app.tsx
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

import '@mantine/core/styles.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { LoginModal, RegisterModal } from '@/features/auth/modals';
import { cssVariablesResolver, theme } from '@/lib/theme';

export default function App({ Component, pageProps }: AppProps) {
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

      <MantineProvider
        theme={theme}
        cssVariablesResolver={cssVariablesResolver}
        defaultColorScheme="light"
      >
        <ModalsProvider
          modals={{
            login: LoginModal,
            register: RegisterModal,
          }}
        >
          <Component {...pageProps} />
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
