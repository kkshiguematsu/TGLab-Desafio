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

export const ContentPage = styled('div')({
  maxWidth: 1200,
});
