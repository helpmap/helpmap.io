import React from 'react';
import { Menu } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

const MenuItem = ({ name, message, icon, intl }) => {
  return (
    <Menu.Item name={name}>
      {icon}
      <span>{intl.formatMessage(message)}</span>
    </Menu.Item>
  );
};
export default injectIntl(MenuItem);
