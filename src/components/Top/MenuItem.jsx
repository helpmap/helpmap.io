import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

const MenuItem = ({ name, message, setActive, activeItem, intl }) => {
  return (
    <Menu.Item name={name} active={activeItem === name} onClick={(e, { name }) => setActive(name)}>
      <Icon size="small" name={activeItem === name ? 'circle' : 'circle outline'} />
      {intl.formatMessage(message)}
    </Menu.Item>
  );
};

export default injectIntl(MenuItem);
