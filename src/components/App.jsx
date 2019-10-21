import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';

import './App.scss';

import TopInfo from './Top/TopInfo';
import Main from './Main';

function App() {
  return (
    <Grid centered>
      <Grid.Row className="top-row">
        <Grid.Column>
          <Segment basic style={{ paddingBottom: 0 }}>
            <TopInfo />
          </Segment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row className="main-row">
        <Grid.Column>
          <Main />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default App;
