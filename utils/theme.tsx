import { createMuiTheme, responsiveFontSizes, Theme, useMediaQuery } from '@material-ui/core';
import { useMemo } from 'react';

export const theme = (): Theme => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const memo = useMemo(
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
            mode: prefersDarkMode ? 'dark' : 'light',
          },
          typography: {
            fontFamily: '"Athiti", "Roboto", "Helvetica", "Arial", sans-serif',
            fontSize: 16,
          },
        })
      ),
    [prefersDarkMode]
  );
  return memo;
};
