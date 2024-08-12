import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

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
  ];

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleButtonClick = (page) => {
    setSelectedPage(page);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mt: 2 }}>
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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
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
                  color={selectedPage === page.path ? 'success' : 'primary'}
                  variant={selectedPage === page.path ? 'outlined' : 'text'}
                  sx={{
                    borderRadius: '80px',
                    padding: 1,
                    fontSize: '0.9rem',
                    fontWeight : selectedPage === page.path ? 'bold' : 'normal',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textTransform: 'none',
                  }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <MenuItem component={Link} to="" sx={{ textTransform: 'none' }}>
                  Search
                </MenuItem>
                <MenuItem component={Link} to="/my-music" sx={{ textTransform: 'none' }}>
                  My Music
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Box>
    </Box>
  );
}
