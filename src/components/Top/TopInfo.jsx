import React from 'react';
import { Modal, Header } from 'semantic-ui-react';
import { injectIntl, FormattedHTMLMessage } from 'react-intl';
import LanguageSwitch from './LanguageSwitch';
import InfoIcon from '../../assets/info';
import Logo from '../../assets/logo';

import './TopInfo.scss';

const TopPanel = ({ intl }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* cursor pointer */}
      <Modal trigger={<InfoIcon />} closeIcon>
        <Modal.Content>
          <FormattedHTMLMessage id="Info" />
        </Modal.Content>
      </Modal>
      <Header as="h2" icon size="medium" style={{ margin: '0 auto' }}>
        <Logo />
        <Header.Subheader>{intl.formatMessage({ id: 'Tagline' })}</Header.Subheader>
      </Header>
      <div className="language-switch">
        <LanguageSwitch />
      </div>
    </div>
  );
};

export default injectIntl(TopPanel);
