import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#a8bdea',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: 'rgba(16, 36, 88, .5)',
      light: 'rgba(74, 108, 247, .2)',
      dark: '#7b1fa2',
      contrastText: '#ffffff',
    },
    success: {
      main: '#2e7d32',
    },
    error: {
      main: '#d32f2f',
    },
    background: {
      default: '#212121',
      paper: '#2F2F2F',
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700
    },
    h2: {
      fontWeight: 600
    },
    body1: {
      lineHeight: 1.5
    }
  }
});

export default darkTheme;