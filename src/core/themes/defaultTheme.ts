import { createTheme } from "@mui/material/styles";

// Create a theme instance.
export const defaultTheme = (primaryColor = '#000000') => createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: [
      'Kanit',  'sans-serif'
    ].join(','),
    h1: {
      fontSize: 32,
      '@media (max-width:600px)': {
        fontSize: 20,
      },
    },
    h2: {
      fontSize: 20,
      fontWeight: "normal",
      '@media (max-width:600px)': {
        fontSize: 18,
      },
    },
    h3: {
      fontSize: 18,
      '@media (max-width:600px)': {
        fontSize: 16,
      },
    },
    h4: {
      fontSize: 16,
      '@media (max-width:600px)': {
        fontSize: 14,
      },
    },
    h5: {
      fontSize: 14,
      '@media (max-width:600px)': {
        fontSize: 12,
      },
    },
    h6: {
      fontSize: 12,
      '@media (max-width:600px)': {
        fontSize: 10,
      },
    },
  },
  palette: {
    primary: {
      main: primaryColor,
    },
    // @ts-ignore
    facebook: {
      main: '#1877F2',
      contrastText: '#ffffff',
    },
    line: {
      main: '#00C300',
      contrastText: '#ffffff',
    },
    apple: {
      main: '#000000',
      contrastText: '#ffffff',
    },
    google: {
      main: '#ffffff',
      contrastText: 'rgba(0, 0, 0, 0.54)',
    },
    grey: {
      50: '#F0F3F9',
      100: '#E5E7EB',
      200: "#B6BECD",
      300: 'rgb(108, 113, 123)',
      400: '#6B7280'
    },
    red: {
      50: '#EF4423',
      100: '#EF4423'
    },
    blackText: {
      main: '#000000',
    },
    whiteText: {
      main: '#ffffff',
    },
    blue: {
      main: "#0971fe"
    },
    orange: {
      main: '#FA9C1B'
    }
  },
});
