import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import TopPanel from './Top/TopPanel';
import Main from './Main';
import "./App.scss";

class App extends Component {
  render() {
    return (
      <Grid centered>
        <Grid.Row className="top-row">
          <Grid.Column>
            <TopPanel />
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
}

export default App;
