import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#4A6CF7',
      light: '#49a7f4',
      dark: '#49a7f4',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#F2F2F2',
      light: 'rgba(74, 108, 247, 0.2)',
      dark: '#616161',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#f8f9fa',
      paper: '#FFF'
    },
    text: {
      primary: '#000',
      secondary: '#4A5568',
      light: '#FFFFFF'
    },
    error: {
      main: '#E53E3E'
    },
    success: {
      main: '#48BB78'
    }
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

export default lightTheme;