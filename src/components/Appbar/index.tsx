import { Box, IconButton, Typography, Portal } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBarStyled, ToolbarStyled } from './styled';
import { useState } from 'react';
import { CustomDrawer } from '../CustomDrawer';
import { BalanceDisplay } from '../BalanceDisplay';

export const CustomAppBar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBarStyled>
        <ToolbarStyled>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon onClick={toggleDrawer(true)} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TG Lab
          </Typography>
          <BalanceDisplay />
        </ToolbarStyled>
      </AppBarStyled>
      <Portal>
        <CustomDrawer open={open} toggleDrawer={toggleDrawer} />
      </Portal>
    </Box>
  );
};
