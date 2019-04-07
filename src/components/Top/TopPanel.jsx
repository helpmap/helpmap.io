import React from 'react';
import { Segment } from 'semantic-ui-react';

import TopInfo from './TopInfo';

const TopPanel = () => (
  <Segment basic style={{ paddingBottom: 0 }}>
    <TopInfo />
  </Segment>
);

export default TopPanel;
