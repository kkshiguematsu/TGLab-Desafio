import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Switch,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '../../context/ThemeContext';
import { AppBarStyled, ToolbarStyled } from './styled';
import { LanguageSelect } from './LanguageSelect';

export const CustomAppBar = () => {
  const { mode, toggleTheme } = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarStyled>
        <ToolbarStyled>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TG Lab
          </Typography>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />}
              label={mode === 'dark' ? 'Dark Mode' : 'Light Mode'}
            />
          </FormGroup>
          <LanguageSelect />
        </ToolbarStyled>
      </AppBarStyled>
    </Box>
  );
};
