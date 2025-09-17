import SunnyIcon from '@mui/icons-material/WbSunny';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import { MenuItem, Select, type SelectChangeEvent, Box } from '@mui/material';
import { useTheme } from '../../../../context/ThemeContext';

export const ThemeModeSelector = () => {
  const { mode, toggleTheme } = useTheme();

  const handleChange = (event: SelectChangeEvent) => {
    const newMode = event.target.value as 'light' | 'dark';
    if (newMode !== mode) toggleTheme();
  };

  return (
    <Select value={mode} onChange={handleChange}>
      <MenuItem value="light">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SunnyIcon />
          Light
        </Box>
      </MenuItem>
      <MenuItem value="dark">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NightlightRoundIcon />
          Dark
        </Box>
      </MenuItem>
    </Select>
  );
};
