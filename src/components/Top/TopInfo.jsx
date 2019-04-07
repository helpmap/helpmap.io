import React from 'react';
import { Segment, Modal, Header } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import LanguageSwitch from './LanguageSwitch';
import InfoIcon from '../../assets/info';
import Logo from '../../assets/logo';

const infoMessage = {
  id: 'Info',
  defaultMessage:
    'Thank You for helping others! \r\n\r\nThe most needed items are toilet paper, soap, toothbrush, toothpaste, laundry detergent, dish-soap, any cleaning supplies or toiletries are great. For more specific needs, please contact the organization directly. \r\n\r\nYou can donate new things and used things. Not sure if you should donate an item? Just contact the organization and ask them if they need it. General rule - would you feel comfortable giving it to a friend or a family member? \r\n\r\nThe best thing you can donate is your time, a lot of organizations need help with something.\r\n\r\nIf you want to help orphans: please consider spending time with the kids. They want to play with other people, they want to learn from others, they need a normal social life. \r\n\r\nIf you would like to help improve the project - apply@kaizerwald.com , https://github.com/gianpaj/helpmap.io\r\n\r\nHave a great day, you are awesome!',
};

const tagline = {
  id: 'Tagline',
  defaultMessage: 'Donate to organisations',
};

const TopPanel = ({ intl }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Modal trigger={<InfoIcon />} closeIcon>
        <Modal.Content>
          <p style={{ whiteSpace: 'pre-line' }}>{intl.formatMessage(infoMessage)}</p>
        </Modal.Content>
      </Modal>
      <Header as="h2" icon size="medium" style={{ margin: '0 auto' }}>
        <Logo />
        <Header.Subheader>{intl.formatMessage(tagline)}</Header.Subheader>
      </Header>
      <Segment.Inline>
        <LanguageSwitch />
      </Segment.Inline>
    </div>
  );
};

export default injectIntl(TopPanel);
