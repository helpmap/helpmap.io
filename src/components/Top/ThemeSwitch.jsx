import React from 'react';
import { injectIntl } from 'react-intl';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { useTheme } from '@material-ui/core/styles';

import './ThemeSwitch.scss';
import { useChangeTheme } from '../App';

export const ThemeSwitch = ({ intl }) => {
  const theme = useTheme();
  const changeTheme = useChangeTheme();

  function toggleDarkMode(): void {
    const paletteMode = theme.palette.mode === 'light' ? 'dark' : 'light';

    changeTheme({ paletteMode });
  }

  return (
    <Tooltip title={intl.formatMessage({ id: 'ToggleTheme' })} enterDelay={300}>
      <IconButton color="inherit" onClick={toggleDarkMode}>
        {theme.palette.mode === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
};

export default injectIntl(ThemeSwitch);
