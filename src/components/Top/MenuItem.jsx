import React from 'react';
import { Menu } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

/** @typedef {import("./CategoryMenu").CategoryMenuItem} CategoryMenuItem */

/**
 *
 * @param {Object} props
 * @param {CategoryMenuItem} props.category
 */
const MenuItem = ({ name, category }) => (
  <Menu.Item name={name}>
    {category.icon}
    <span>
      <FormattedMessage id={category.id} />
    </span>
  </Menu.Item>
);
export default MenuItem;
