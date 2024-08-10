import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import NavigationBar from './components/NavigationBar.tsx';


export default function App() {
  const [mode, setMode] = React.useState<PaletteMode>('light');

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <CssBaseline>
      <NavigationBar mode={mode} toggleColorMode={toggleColorMode} />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
      </Container>
    </CssBaseline>
  );
}
