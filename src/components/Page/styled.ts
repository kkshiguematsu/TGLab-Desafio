import { styled } from '@mui/material/styles';

interface MainBoxProps {
  backgroundImage?: string;
  alignItems?: string;
  justifyContent?: string;
}

export const MainBox = styled('div')<MainBoxProps>(
  ({ theme, backgroundImage, alignItems, justifyContent }) => ({
    height: '100vh',
    minHeight: '100vh',
    display: 'flex',
    alignItems: alignItems ? alignItems : 'start',
    justifyContent: justifyContent ? justifyContent : 'center',
    backgroundColor: theme.palette.background.default,
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
    backgroundSize: 'contain',
    backgroundPosition: 'right center',
    backgroundRepeat: 'no-repeat',
  }),
);

export const ContentPage = styled('div')(({ theme }) => ({
  overflowX: 'auto',
  margin: '0 auto',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    maxWidth: 1200,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));
