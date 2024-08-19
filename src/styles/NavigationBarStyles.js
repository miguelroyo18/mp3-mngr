import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';

export const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: 15,
  padding: '8px 12px',
  width: '100%',
}));

export const CustomInput = styled(InputBase)(({ theme }) => ({
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
    fontSize: '0.9rem',
    textTransform: 'none',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}));

export const MenuPropsStyle = {
  PaperProps: {
    sx: {
      mt: 4,
      color: '#878787',
      borderRadius: 4,
      bgcolor: '#1F1F1F',
      '& .MuiMenu-list': {
        paddingTop: 0,
        paddingBottom: 0,
      },
      '& .MuiMenuItem-root': {
        padding: '12px 20px',
        bgcolor: '#1F1F1F',
        fontSize: '0.9rem',
      },
      '& .Mui-selected': {
        color: 'primary.main',
        fontWeight: 'bold',
        bgcolor: '#1F1F1F !important',
      },
    },
  },
}
