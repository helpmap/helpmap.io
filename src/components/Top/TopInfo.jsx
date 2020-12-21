import React, { useState } from 'react';
import { Header } from 'semantic-ui-react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Modal } from 'antd';

import LanguageSwitch from './LanguageSwitch';
import InfoIcon from '../../assets/info';
import Logo from '../../assets/logo';

import './TopInfo.scss';

const TopInfo = () => {
  const intl = useIntl();
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="top-info-button">
        {/* eslint-disable-next-line react/jsx-no-bind */}
        <div className="info-div" role="button" tabIndex="0" onClick={() => setVisible(true)}>
          <InfoIcon />
        </div>
        {/* <a className="patreon" href="https://www.patreon.com/helpmap_io" target="_blank" rel="noopener noreferrer">
          Patreon
        </a> */}
        {/* <a className="onova" href="https://onova.co/helpmap" target="_blank" rel="noopener noreferrer">
          Підтримати
        </a> */}
      </div>
      <div className="top-info-body">
        <Modal
          className="info-modal"
          title={<FormattedMessage id="Info.Title" />}
          visible={visible}
          // eslint-disable-next-line react/jsx-no-bind
          onCancel={() => setVisible(false)}
          footer={null}>
          <div dangerouslySetInnerHTML={{ __html: intl.formatMessage({ id: 'Info' }) }} />
        </Modal>
        <Header as="h2" icon size="medium">
          <Logo className="logo" />
          <Header.Subheader className="tagline">
            <FormattedMessage id="Tagline" />
          </Header.Subheader>
        </Header>
        <div className="language-switch">
          <LanguageSwitch />
        </div>
      </div>
    </>
  );
};

export default TopInfo;
