import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton, { iconButtonClasses } from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import DownloadingRoundedIcon from '@mui/icons-material/DownloadingRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { customSearchInput } from '../styles/SearchViewStyles.js';

export default function SearchView({
  searchResults,
  searchQuery,
  onSearch,
  onSearchQueryChange,
  loading,
}) {

  const renderSearch = () => (
    <Box sx={{ display: 'flex' }}>
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
      <React.Fragment>
        <Box
          className="SearchView"
          sx={{
            borderRadius: 'sm',
            py: 1.5,
            flexWrap: 'wrap',
            gap: 1.5,
            '& > *': {
              minWidth: { xs: '120px', md: '160px' },
            },
          }}
        >
          <FormControl sx={{ flex: 1, width: '100%' }}>
            {renderSearch()}
          </FormControl>
        </Box>
        <Box
          sx={{
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 250px)', // TODO: Change accordingly when introducing music bar
            overflowX: 'hidden',
            mt: 2,
            borderRadius: '15px'
          }}
        >
          {searchResults.map((result) => (
            <List key={result.id} sx={{ padding: 0 }}>
              <ListItem
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <ListItemText
                  primary={
                    <Typography fontWeight={600} gutterBottom>
                      {result.title}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5,
                          mb: 1,
                        }}
                      >
                        <Typography variant="body2">{result.author}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <Chip
                          variant="outlined"
                          size="small"
                          color="primary"
                          label={result.viewCountText}
                        />
                        {result.downloading ? (
                          <Button
                            sx={{ position: 'absolute', right: 0, mr: 4 }}
                            variant="contained"
                            size="small"
                            startIcon={<DownloadingRoundedIcon />}
                            color="success"
                          >
                            Download
                          </Button>
                        ) : (
                          <Button
                            sx={{ position: 'absolute', right: 0, mr: 4 }}
                            variant="contained"
                            size="small"
                            startIcon={<DownloadRoundedIcon />}
                            color="primary"
                          >
                            Download
                          </Button>
                        )}
                      </Box>
                    </>
                  }
                />
              </ListItem>
              <Divider />
            </List>
          ))}
        </Box>
      </React.Fragment>
    );
  };

  return (
    <Box>
      {renderListElements()}
    </Box>
  );
}
