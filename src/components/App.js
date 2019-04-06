import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import './App.css';
import TopPanel from './Top/TopPanel';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <Grid centered>
        <Grid.Row>
          <Grid.Column>
            <TopPanel />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Main />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default App;
