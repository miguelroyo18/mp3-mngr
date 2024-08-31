import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import CircularProgress from '@mui/material/CircularProgress';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';

import Player, {
  Track,
  PlayerInterface,
} from "./react-material-music-player/index.js";

import { customSearchInput } from '../styles/SearchViewStyles.js';

export default function SearchView({
  searchResults,
  searchQuery,
  onSearch,
  onSearchQueryChange,
  loading,
}) {


  const noSearchResults = searchResults.length === 0;

  const downloadTempTrack = async (track_id) => {
      try {
          const response = await fetch('/api/download_track', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ track_id: track_id }),
          });

          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
      } catch (error) {
          console.log('Error downloading track:', error);
      }
  }

  const [highlightedTrackId, setHighlightedTrackId] = useState(null);

  
  const playTrack = async (trackId, thumbnailUrl, title, author) => {
    setHighlightedTrackId(trackId);

    try {
      PlayerInterface.clearPlaylist()
      await downloadTempTrack(trackId);

      PlayerInterface.play ([
        new Track(
          "1",
          thumbnailUrl,
          title,
          author,
          encodeURI('http://192.168.1.35:5001/api/media/' + title + '.webm'),
        ),
      ]);

    } catch (error) {
      console.error('Error downloading or playing the track:', error);
    } finally {
      setHighlightedTrackId(null);
    }
  };

  const renderNoSearchResultsMessage = () => (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, justifyContent: 'center', height: '60vh' }}
    >
      <SearchRoundedIcon 
        sx={{
          fontSize: '4rem',
          opacity: 0.9
        }}
      >
      </SearchRoundedIcon>
      <Typography
        variant="h4"
        sx={{ alignItems: 'flex-start', opacity: 0.9 }}
      >
        No Results
      </Typography>
  
      <Typography
        sx={{
          fontSize: '1rem',
          mt: -1.5,
          opacity: 0.5
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
            sx={{ ml: -1 }}
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
          const url = "https://www.youtube.com/watch?v=" + result.videoId

          const isHighlighted = highlightedTrackId === result.videoId;
  
          return (
            <List key={result.id} sx={{ padding: 0, mr: -1.5 }}>
              <ListItem
                sx={{
                  display: 'flex',
                  cursor: 'pointer',
                  backgroundColor: isHighlighted ? 'rgba(200, 200, 200, 0.4)' : 'transparent',
                  transition: 'background-color 0.3s ease, transform 0.3s ease',
                }}
                onClick={() => playTrack(result.videoId, thumbnailUrl, result.title, result.author)}
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
                    aria-label="add"
                    onClick={(e) => {
                    e.stopPropagation();
                  }}
                  >
                    <AddRoundedIcon sx={{ fontSize: '1.5rem' }} />
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
