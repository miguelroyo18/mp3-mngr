import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';

import { ThemeProvider } from '@mui/material/styles';

import NavigationBar from './components/NavigationBar.tsx';
import greenTheme from './theme.js';


function SearchPage() {
  return(
    <Typography level="h2" component="h1">
      Search
    </Typography>
  );
}

function MyMusicPage() {
  return(
    <Typography level="h2" component="h1">
      My music
    </Typography>
  );
}

function DiscoverPage() {
  return(
    <Typography level="h2" component="h1">
      Discover
    </Typography>
  );
}


export default function App() {
  return (
    <ThemeProvider theme={greenTheme}>
      <CssBaseline>
        <Router>
          <NavigationBar />
          <Routes>
            <Route index element={<SearchPage />} />
            <Route path="/my-music" element={<MyMusicPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
          </Routes>
        </Router>
      </CssBaseline>
    </ThemeProvider>
  );
}
