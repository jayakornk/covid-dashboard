import { ThemeOptions } from '@material-ui/core';

export const themeOptionsDark: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#2d333b',
    },
    secondary: {
      main: '#539bf5',
    },
    background: {
      default: '#22272e',
      paper: '#2d333b',
    },
    text: {
      primary: '#adbac7',
      secondary: '#768390',
      disabled: '#545d68',
    },
    error: {
      main: '#e5534b',
    },
    warning: {
      main: '#daaa3f',
    },
    info: {
      main: '#6cb6ff',
    },
    success: {
      main: '#6bc46d',
    },
    divider: '#373e47',
  },
  typography: {
    fontFamily: '"Bai Jamjuree", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
  },
};

export const themeOptionsLight: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#24292f',
    },
    secondary: {
      main: '#0366d6',
    },
    background: {
      default: '#ffffff',
      paper: '#f6f8fa',
    },
    text: {
      primary: '#24292e',
      secondary: '#586069',
      disabled: '#959da5',
    },
    error: {
      main: '#cb2431',
    },
    warning: {
      main: '#b08800',
    },
    info: {
      main: '#0366d6',
    },
    success: {
      main: '#22863a',
    },
    divider: '#eaecef',
  },
  typography: {
    fontFamily: '"Bai Jamjuree", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
  },
};
