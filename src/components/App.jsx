import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { useTheme } from '@material-ui/core';

import './App.scss';

import TopInfo from './Top/TopInfo';
import Main from './Main';
import { DispatchContext, ThemeProvider } from './ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Grid centered>
        <TopGrid />
        <Grid.Row className="main-row">
          <Grid.Column>
            <Main />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </ThemeProvider>
  );
}
function TopGrid() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode == 'dark';

  return (
    <Grid.Row className="top-row">
      <Grid.Column>
        <Segment className="top-segment" inverted={isDarkMode} basic>
          <TopInfo />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  );
}

export default App;

/**
 * @returns {(nextOptions: Partial<typeof themeInitialOptions>) => void}
 */
export function useChangeTheme() {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback(options => dispatch({ type: 'CHANGE', payload: options }), [dispatch]);
}
