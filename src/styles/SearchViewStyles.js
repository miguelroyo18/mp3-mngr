import { styled } from '@mui/material/styles';

export const customSearchInput = {
  borderRadius: '15px',
  height: '45px',
  backgroundColor: '#1F1F1F',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: '#1F1F1F',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'primary.main',
  },
  '& input::placeholder': {
    color: '#878787',
    opacity: 1,
    fontSize: '1rem'
  },
  '& .MuiInputBase-input': {
    paddingLeft: '8px',
  },
};
