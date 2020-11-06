import React from 'react';
import { ThemeProvider as MuiThemeProvider, createMuiTheme, darken } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { getCookie } from './utils';

const themeInitialOptions = {
  direction: 'ltr',
  paletteColors: {},
};

export const DispatchContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`');
});

if (process.env.NODE_ENV !== 'production') {
  DispatchContext.displayName = 'ThemeDispatchContext';
}

export function ThemeProvider(props) {
  const { children } = props;

  const [themeOptions, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          paletteMode: action.payload.paletteMode || state.paletteMode,
          direction: action.payload.direction || state.direction,
          paletteColors: action.payload.paletteColors || state.paletteColors,
        };
      default:
        throw new Error(`Unrecognized type ${action.type}`);
    }
  }, themeInitialOptions);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredMode = prefersDarkMode ? 'dark' : 'light';
  const { direction, paletteColors, paletteMode = preferredMode } = themeOptions;

  React.useEffect(() => {
    if (process.browser) {
      const nextPaletteColors = JSON.parse(getCookie('paletteColors') || 'null');
      const nextPaletteType = getCookie('paletteMode');

      dispatch({
        type: 'CHANGE',
        payload: { paletteColors: nextPaletteColors, paletteMode: nextPaletteType },
      });
    }
  }, []);

  // persist paletteMode
  React.useEffect(() => {
    document.cookie = `paletteMode=${paletteMode};path=/;max-age=31536000`;
  }, [paletteMode]);

  // useEnhancedEffect(() => {
  //   document.body.dir = direction;
  // }, [direction]);

  const theme = React.useMemo(() => {
    const nextTheme = createMuiTheme(
      {
        direction,
        // nprogress: {
        //   color: paletteMode === 'light' ? '#000' : '#fff',
        // },
        palette: {
          primary: {
            main: paletteMode === 'light' ? blue[700] : blue[200],
          },
          secondary: {
            main: paletteMode === 'light' ? darken(pink.A400, 0.1) : pink[200],
          },
          mode: paletteMode,
          background: {
            default: paletteMode === 'light' ? '#fff' : '#121212',
          },
          ...paletteColors,
        },
      }
      //  highDensity : null,
    );

    nextTheme.palette.background.level2 = paletteMode === 'light' ? nextTheme.palette.grey[100] : '#333';

    nextTheme.palette.background.level1 = paletteMode === 'light' ? '#fff' : nextTheme.palette.grey[900];

    return nextTheme;
  }, [direction, paletteColors, paletteMode]);

  return (
    <MuiThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </MuiThemeProvider>
  );
}
