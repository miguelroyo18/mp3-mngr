import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import AudioFileRoundedIcon from '@mui/icons-material/AudioFileRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: 50,
  backgroundColor: '#1F1F1F',
  padding: '8px 12px',
}));

export default function NavigationBar() {
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
  };

  const [dir, setDir] = React.useState('');

  const handleSelectChange = (event: SelectChangeEvent) => {
    setDir(event.target.value);
  };

  // TODO: Move somewhere else
  const CustomInput = styled(InputBase)(({ theme }) => ({
    '&:before': {
      borderBottom: 'none',
    },
    '&:after': {
      borderBottom: 'none',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
    '& .MuiInputBase-input': {
    color: '#878787',
    },
  }));

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mt: 2 }}>
      <Typography
        variant="h6"
        color="inherit"
        sx={{
          ml: 4,
          mr: 2,
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          letterSpacing: '0.5px',
          fontSize: '1rem',
        }}
      >
        mp3-mngr
      </Typography>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 5 }}>
              {pages.map((page) => (
                <Button
                  key={page.path}
                  component={Link}
                  to={page.path}
                  selected={selectedPage === page.path}
                  onClick={() => handleButtonClick(page.path)}
                  size="small"
                  sx={{
                    borderRadius: '80px',
                    fontSize: '0.9rem',
                    fontWeight : selectedPage === page.path ? 'bold' : 'normal',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'none',
                    gap: 1,
                  }}
                >
                  {(() => {
                    if (selectedPage === page.path) {
                      return (
                        <Typography 
                          color="primary"
                          sx={{
                            fontSize: '1.9rem',
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
          </Box>
        </StyledToolbar>
      </Box>
      <Box sx={{ display: { md: 'flex', xs: 'none' }, alignItems: 'center', mr: 4 }}>
        <Select
          value={dir}
          onChange={handleSelectChange}
          input={<CustomInput />}
          IconComponent={KeyboardArrowDownRoundedIcon}
          sx={{
            fontSize: '0.9rem',
            borderRadius: '50px',
            textTransform: 'none',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            backgroundColor: '#1F1F1F',
            padding: 2.3,
          }}
          renderValue={(selected) => (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AudioFileRoundedIcon sx={{ marginRight: 2, ml:1 }} color="primary" />
            {selected}
          </Box>
          )}
          MenuProps={{
            PaperProps: {
              sx: {
                mt: 1,
                color: '#878787',
                bgcolor: '#1F1F1F',
                borderRadius: 5,
                '& .MuiMenu-list': {
                  paddingTop: 0,
                  paddingBottom: 0,
                },
                '& .MuiMenuItem-root': {
                  padding: '12px 20px',
                  bgcolor: '#1F1F1F',
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                },
                '& .Mui-selected': {
                  color: '#F5F5F5',
                },
              },
            },
            transformOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
          }}
        >
          <MenuItem value={"home/miguel/Downloads"}>/home/miguel/Downloads</MenuItem>
          <MenuItem value={"home/miguel/Downloads{{fdakjafd}}"}>/home/miguel/Downloadskajsfdlkjasfdlkjqw</MenuItem>
        </Select>
      </Box>
      <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 4 }}>
        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
          <MenuRoundedIcon />
        </IconButton>
        <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
          <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
            {pages.map((page) => (
              <MenuItem component={Link} to={page.path} sx={{ textTransform: 'none' }} >
                {page.label}
              </MenuItem>
            ))}
          </Box>
        </Drawer>
      </Box>
    </Box>
  );
}
