import { createTheme } from '@mui/material/styles';

const greenTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0D0D0D',
      paper: '#1F1F1F',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
      paper: '#878787'
    },

    primary: {
      main: '#81FFD9',
      light: '#9DDE8B',
      dark: '#81FFD9',
      contrastText: '#FFFFFF',
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          textTransform: 'none',
          color: ownerState.selected ? '#F5F5F5' : '#878787',
        }),
      },
    },
  },

});

export default greenTheme;
