import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { ThemeProvider } from '@mui/material/styles';

import NavigationBar from './components/NavigationBar.tsx';
import SearchView from './components/SearchView.tsx';

import { SearchResultsProvider, useSearchResults } from './SearchResultsContext.js';
import greenTheme from './theme.js';


function SearchPage() {

  const {searchResults, updateSearchResults} = useSearchResults();
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      updateSearchResults([]); // TODO: Is it necessary?
  
      try {
        setLoading(true);
        const response = await fetch(`/api/search_track?query=${searchQuery}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();

        let uniqueIdCounter = 1;
        const resultsWithSelection = data.map((result) => ({
          ...result,
          id: uniqueIdCounter++,
          downloading: false,
        }));

        updateSearchResults(resultsWithSelection);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } catch (error) {
      console.error('Error clearing previous results:', error);
    } finally {
        setSearchQuery('');
        setLoading(false);
    }
  };

  return(
    <Box
      className="Search"
      sx={{
        px: { xs: 2, md: 4 },
        pb: { xs: 2, sm: 2, md: 3 },
        mt: 2,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0,
        height: '100dvh',
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: {md: 'none', xs: 'flex'},
          gap: 1,
          flexDirection: { xs: 'row', sm: 'row' },
          alignItems: { xs: 'start', sm: 'center' },
          flexWrap: 'wrap',
          justifyContent: 'space-between',
        }}
      >
        <Typography 
          variant="h6" 
          color="inherit"
          sx={{
            whiteSpace: 'nowrap',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            fontSize: '1.5rem',
          }}
        >
          Search
       </Typography>
      </Box>

      <SearchView
          searchResults={searchResults}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          onSearchQueryChange={setSearchQuery}
          loading={loading}
      />

    </Box>
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
    <SearchResultsProvider>
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
    </SearchResultsProvider>
  );
}
