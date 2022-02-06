import { createTheme } from '@material-ui/core/styles';
import tinycolor from 'tinycolor2';

export const lighten = (color, percent) => tinycolor(color).lighten(percent).toString();
export const darken = (color, percent) => tinycolor(color).darken(percent).toString();

// Allow to use breakpoints
const defaultTheme = createTheme();

const white = '#FFFFFF';
const black = '#000000';
const primary = '#FD8A25';
const secondary = '#1682FB';
const tertiary = '#DE2430';
const font1 = '"Roboto", "Open Sans", "sans-serif"';

let theme = createTheme({
  
  palette: {
    primary: {
      light:  lighten(primary,10),
      main: primary,
      dark: darken(primary,10),
      contrastText: white,
    },
    secondary: {
      light: lighten(secondary,10),
      main: secondary,
      dark: darken(secondary,10),
      contrastText: white,
    },
    tertiary: {
      light: lighten(tertiary,10),
      main: tertiary,
      dark: darken(tertiary,10),
      contrastText: white,
    },
    white: {
      main: white,
      contrastText: lighten(black,50),
    },
    black: {
      main: black,
      contrastText: lighten(black,50),
    },
  },
  
  typography: {
    fontFamily: font1,
    fontSize: 16,
    h1: {
      fontSize: '2.4rem',
      fontWeight: 400,
      lineHeight: '150%',
      [defaultTheme.breakpoints.up('sm')]: {
        fontSize: '2.8rem',
      },
    },
    h2: {
      fontSize: '1.2rem',
      fontWeight: 600,
      lineHeight: '150%',
      [defaultTheme.breakpoints.up('sm')]: {
        fontSize: '1.4rem',
      },
    },
    body1: {
      color: black
    },
    span: {
      color: secondary
    }
  },
  
  overrides: {
    MuiTypography: {
      root: {
        '& strong': {
          color: secondary
        }
      }
    },
    MuiButton: {
      root: {
        width: '90%',
        maxWidth: 320,
        borderRadius: '16px',
        textTransform: 'unset',
        fontWeight: 600
      }
    }
  }
  
});

export default theme;