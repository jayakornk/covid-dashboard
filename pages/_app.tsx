import '../styles/globals.css';

import { createMuiTheme, useMediaQuery } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useMemo } from 'react';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createMuiTheme({
          palette: {
            // primary: {
            //   main: '#d6a46d',
            // },
            // background: {
            //   default: '#353353',
            // },
            type: prefersDarkMode ? 'dark' : 'light',
          },
          typography: {
            fontFamily: '"Athiti", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: 16,
          },
        })
      ),
    [prefersDarkMode]
  );

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <Head>
        <title>JayakornK - Covid Dashboard</title>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
