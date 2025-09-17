import { Box, MenuItem, Select, type SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FlagIcon } from './FlagIcon';

import flagBR from '/assets/flags/br.png';
import flagEN from '/assets/flags/en.png';
import flagES from '/assets/flags/es.png';

const supportedLanguages = [
  { code: 'pt', label: 'Português', flag: flagBR },
  { code: 'en', label: 'English', flag: flagEN },
  { code: 'es', label: 'Español', flag: flagES },
];

export const LanguageSelect = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <Select
      labelId="select-label"
      id="language-select"
      value={i18n.language || 'pt'}
      label="Language"
      onChange={handleChangeLanguage}
    >
      {supportedLanguages.map((lang) => (
        <MenuItem key={lang.code} value={lang.code}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <FlagIcon flag={lang.flag} />
            <span>{lang.label}</span>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
};
