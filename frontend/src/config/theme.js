import { createTheme } from '@material-ui/core/styles';
import tinycolor from 'tinycolor2';

export const lighten = (color, percent) => tinycolor(color).lighten(percent).toString();
export const darken = (color, percent) => tinycolor(color).darken(percent).toString();

// Allow to use breakpoints
const defaultTheme = createTheme();

const white = '#FFFFFF';
const black = '#000000';
const primary = '#f9b233';    //orange
const secondary = '#2b3089';  //blue
const tertiary = '#DE2430';   //red
const font1 = '"Red Hat Display", "Open Sans", "sans-serif"';

let theme = createTheme({
  
  color: {
    white: white,
    black: black,
    grey10: darken(white, 10),
    grey25: darken(white, 25),
    grey50: darken(white, 50),
    grey75: darken(white, 75),
    primary: primary,
    secondary: secondary,
    tertiary: tertiary
  },
  
  margin: {
    header: 48
  },
  
  palette: {
    primary: {
      main: primary + ' !important',
      contrastText: white + ' !important',
    },
    secondary: {
      main: secondary + ' !important',
      contrastText: white + ' !important',
    },
    tertiary: {
      main: tertiary + ' !important',
      contrastText: black + ' !important',
    },
    white: {
      main: white + ' !important',
      contrastText: lighten(black,50) + ' !important',
    },
    black: {
      main: black + ' !important',
      contrastText: lighten(black,50) + ' !important',
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
    MuiButton: {
      root: {
        width: '90%',
        maxWidth: 320,
        borderRadius: '16px',
        textTransform: 'unset',
        fontWeight: 600
      },
    },
  }
  
});

export default theme;