import { createTheme } from '@mui/material/styles';


const greenTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0D0D0D',
      paper: '#121212',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0'
    }
  },
});

export default greenTheme;
