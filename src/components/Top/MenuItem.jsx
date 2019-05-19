import React from 'react';
import { Menu as MenuSM } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';

import categories from './messages/menuMessages';

let MenuItem = ({ name, message, icon, intl, onClick }) => {
  return (
    <MenuSM.Item name={name} onClick={onClick}>
      {icon}
      <span>{intl.formatMessage(message)}</span>
    </MenuSM.Item>
  );
};
MenuItem = injectIntl(MenuItem);

const Menu = props =>
  Object.keys(categories).map((name, index) => (
    <MenuItem
      onClick={props.onSelect}
      key={index}
      name={name}
      icon={categories[name].icon}
      message={categories[name]}
    />
  ));

export default Menu;
