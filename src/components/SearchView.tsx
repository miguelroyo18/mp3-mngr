import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton, { iconButtonClasses } from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';

import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

import { customSearchInput } from '../styles/SearchViewStyles.js';

export default function SearchView({
  searchResults,
  searchQuery,
  onSearch,
  onSearchQueryChange,
  loading,
}) {


  const noSearchResults = searchResults.length === 0;


  const renderNoSearchResultsMessage = () => (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, justifyContent: 'center', height: '60vh' }}
    >
      <SearchRoundedIcon 
        sx={{
          fontSize: '4rem'
        }}
      >
      </SearchRoundedIcon>
      <Typography
        variant="h4"
        sx={{ alignItems: 'flex-start' }}
      >
        No Results
      </Typography>
  
      <Typography
        sx={{
          fontSize: '1rem',
          mt: -1.5,
          opacity: 0.8
        }}
      >
        Start searching now.
      </Typography>
  
    </Box>
  );

  const renderLoadingIndicator = () => (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 2,  alignItems: 'center', justifyContent: 'center', height: '60vh' }}
    >
      <CircularProgress 
        thickness={4}
        size={40}
      />
    </Box>
  );

  const renderSearch = () => (
    <Box sx={{ display: 'flex', mb: 3 }}>
      <OutlinedInput
        fullWidth
        placeholder="Artists, songs and more"
        startAdornment={
          <IconButton
            onClick={onSearch}
            color="primary"
          >
            <SearchRoundedIcon />
          </IconButton>
        }
        sx={customSearchInput}
        onChange={(e) => onSearchQueryChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch() && e.target.blur();
          }
        }}
      />
    </Box>
  );

  const renderListElements = () => {
    return (
      <Box
        sx={{
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 250px)', // Adjust accordingly when introducing music bar
          overflowX: 'hidden',
          mt: 2,
          borderRadius: '15px',
        }}
      >
        {searchResults.map((result) => {
          const thumbnailUrl = result.videoThumbnails[0]?.url;
  
          return (
            <List key={result.id} sx={{ padding: 0, mr: -1.5 }}>
              <ListItem
                sx={{
                  display: 'flex',
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={thumbnailUrl}
                    alt={result.title}
                    variant="square"
                    sx={{ width: 60, height: 60, borderRadius: '5px', mr: 2 }}
                  />
                </ListItemAvatar>
  
                <ListItemText
                  primary={
                    <Typography 
                      gutterBottom
                      sx={{
                        fontSize: '0.9rem',
                        fontWeight: 'bold'
                      }}
                    >
                      {result.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mt: -0.5
                        }}
                      >
                        <Typography color="primary" variant="body2">{result.author}</Typography>
                      </Box>
                    </>
                  }
                />
                <Box sx={{ display: 'flex', ml: 1 }}>
                  <IconButton
                    sx={{ color: 'primary.main' }}
                    aria-label="download"
                  >
                    <DownloadRoundedIcon sx={{ fontSize: '1.5rem' }} />
                  </IconButton>
                  <IconButton
                    sx={{ color: 'primary.main' }}
                    aria-label="play"
                  >
                    <PlayArrowRoundedIcon sx={{ fontSize: '1.8rem' }} />
                  </IconButton>
                </Box>
              </ListItem>
              <Divider />
            </List>
          );
        })}
      </Box>
    );
  };

  return (
    <Box>
      {renderSearch()}
      {loading ? renderLoadingIndicator() : (noSearchResults ? renderNoSearchResultsMessage() : renderListElements())}
    </Box>
  );
}
