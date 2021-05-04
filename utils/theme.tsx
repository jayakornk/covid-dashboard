import { createMuiTheme, responsiveFontSizes, Theme, useMediaQuery } from '@material-ui/core';
import { useMemo } from 'react';

import { themeOptionsDark, themeOptionsLight } from './githubThemes';

export const theme = (): Theme => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const memo = useMemo(
    () =>
      responsiveFontSizes(
        createMuiTheme(prefersDarkMode ? themeOptionsDark : themeOptionsLight)
        // createMuiTheme({
        //   palette: {
        //     // primary: {
        //     //   main: '#d6a46d',
        //     // },
        //     // background: {
        //     //   default: '#353353',
        //     // },
        //     mode: prefersDarkMode ? 'dark' : 'light',
        //   },
        //   typography: {
        //     fontFamily: '"Bai Jamjuree", "Roboto", "Helvetica", "Arial", sans-serif',
        //     fontSize: 16,
        //   },
        // })
      ),
    [prefersDarkMode]
  );
  return memo;
};
