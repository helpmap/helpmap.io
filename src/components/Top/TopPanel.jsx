import React from 'react';
import { Segment } from 'semantic-ui-react';
import CategoryMenu from './CategoryMenu';
import TopInfo from './TopInfo';

const TopPanel = () => {
  return (
    <Segment>
      <TopInfo />
      <CategoryMenu />
    </Segment>
  );
};

export default TopPanel;
