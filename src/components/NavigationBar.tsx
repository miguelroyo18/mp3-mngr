import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AudioFileRoundedIcon from '@mui/icons-material/AudioFileRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import { StyledToolbar, CustomInput, MenuPropsStyle } from '../styles/NavigationBarStyles.js';

export default function NavigationBar({
  musicDir,
  setMusicDir,
  directories
}) {

  const [open, setOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState('');

  const pages = [
    { path: '', label: 'Search' },
    { path: 'my-music', label: 'My Music' },
    { path: 'discover', label: 'Discover' },
  ];

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleButtonClick = (page) => {
    setSelectedPage(page);
    if (open) {
      setOpen(false);
    }
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setMusicDir(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mt: 2 }}>
      <Typography
        variant="h6"
        color="inherit"
        sx={{
          ml: {xs: 2, md: 4},
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          letterSpacing: '0.5px',
          fontSize: '1rem',
        }}
      >
        mp3-mngr
      </Typography>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', width: '60%', ml: 10, mr: 2 }}>
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 0, gap: 5 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 5, mr: 4 }}>
              {pages.map((page) => (
                <Button
                  key={page.path}
                  component={Link}
                  to={page.path}
                  selected={selectedPage === page.path}
                  onClick={() => handleButtonClick(page.path)}
                  size="small"
                  sx={{
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    fontWeight : selectedPage === page.path ? 'bold' : 'normal',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'none',
                    padding: '10 10 0 0',
                    gap: 1,
                  }}
                >
                  {(() => {
                    if (selectedPage === page.path) {
                      return (
                        <Typography 
                          color="primary"
                          sx={{
                            fontSize: '1.6rem',
                            fontWeight: 'bold',
                          }}
                        >
                          &bull;
                        </Typography>
                      )
                    }
                  })()}
                  {page.label}
                </Button>
              ))}
            </Box>
            <Select
              value={musicDir}
              onChange={handleSelectChange}
              input={<CustomInput />}
              IconComponent={KeyboardArrowDownRoundedIcon}
              renderValue={(selected) => (
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                <AudioFileRoundedIcon sx={{ marginRight: 2, ml: 1 }} color="primary" />
                {selected}
              </Box>
              )}
              MenuProps={MenuPropsStyle}
            >
              {directories.map((directory) => (
                  <MenuItem key={directory} value={directory}>
                    {directory}
                  </MenuItem>
              ))}
            </Select>
          </Box>
        </StyledToolbar>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 2 }}>
        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
          <MenuRoundedIcon />
        </IconButton>
        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
          <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
            {pages.map((page) => (
              <MenuItem 
                component={Link} 
                to={page.path} 
                onClick={() => handleButtonClick(page.path)}
                variant="outlined"
                sx={{ 
                  borderRadius: '5px',
                  fontSize: '0.9rem',
                  fontWeight : selectedPage === page.path ? 'bold' : 'normal',
                  display: 'flex',
                  textTransform: 'none',
                  color: selectedPage === page.path ? 'primary.main' : '#878787',
                }}
              >
                {page.label}
              </MenuItem>
            ))}
            <Divider />
            <Select
              value={musicDir}
              onChange={handleSelectChange}
              input={<CustomInput />}
              IconComponent={KeyboardArrowDownRoundedIcon}
              sx={{
                mt: 1
              }}
              renderValue={(selected) => (
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 1 }}>
                <AudioFileRoundedIcon sx={{ marginRight: 2, ml: 1 }} color="primary" />
                {selected}
              </Box>
              )}
              MenuProps={MenuPropsStyle}
            >
              {directories.map((directory) => (
                  <MenuItem key={directory} value={directory}>
                    {directory}
                  </MenuItem>
              ))}
            </Select>
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}
