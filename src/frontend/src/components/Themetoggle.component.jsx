import { IconButton, Tooltip } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const ThemeToggleButton = ({ currentTheme, setTheme, sx }) => {
  const isDark = currentTheme === 'dark';

  const changeTheme = () => setTheme(!!isDark ? 'light' : 'dark');

  return (
    <Tooltip title={currentTheme === 'light' ? 'Modo escuro' : 'Modo claro'} sx={{ ...sx }}>
      <IconButton onClick={changeTheme} color="inherit">
        {!isDark ? (
          <Brightness4Icon sx={{ color: 'dark' }} />
        ) : (
          <Brightness7Icon sx={{ color: 'text.contrastText' }} />
        )}
      </IconButton>
    </Tooltip>
  );
};