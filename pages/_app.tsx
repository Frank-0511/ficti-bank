// pages/_app.tsx
import { MantineProvider } from '@mantine/core';

import '@mantine/core/styles.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { cssVariablesResolver, theme } from '../theme';

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
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
