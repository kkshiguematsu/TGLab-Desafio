import { Button, styled, TextField } from '@mui/material';

export const InputNumberStyled = styled(TextField)(({ theme }) => ({
  '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
    display: 'none',
  },
  '& input[type=number]': {
    MozAppearance: 'textfield',
  },
}));

export const ButtonBetActionStyled = styled(Button)(({ theme }) => ({
  fontSize: 20,
  height: '100%',
}));
