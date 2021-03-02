import '../styles/globals.css';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';

import { theme } from '@/utils/theme';

export const cache = createCache({ key: 'css-server', prepend: true });

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const memoizedTheme = theme();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <CacheProvider value={cache}>
      <Head>
        <title>JayakornK - Covid Dashboard</title>
        <meta name="theme-color" content={memoizedTheme.palette.primary.main} />
        <meta name="color-scheme" content="dark light" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={memoizedTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
