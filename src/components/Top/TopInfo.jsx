import React from 'react';
import { Segment, Icon, Popup } from 'semantic-ui-react';
import LanguageSwitch from './LanguageSwitch';

const TopPanel = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Popup trigger={<Icon name="info circle" size="big" />} content='Some info will be here' />
            <Icon name="heart" size="big" />
            <Segment.Inline>
              <LanguageSwitch />
            </Segment.Inline>
      </div>
    );
}

export default TopPanel;
