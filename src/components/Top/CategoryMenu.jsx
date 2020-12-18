import React from 'react';
import { Menu } from 'semantic-ui-react';
import { ToggleButton } from '@appbaseio/reactivesearch';

import './CategoryMenu.scss';

import MenuItem from './MenuItem';
import categories from './messages/menuMessages';

/**
 * @typedef {Object} CategoryMenuItem
 * @property {String} id
 * @property {String} defaultMessage
 * @property {ReactElement} icon
 * @property {String} color
 */

const dataCategories = Object.keys(categories).map((name, index) => ({
  label: <MenuItem key={index} name={name} category={categories[name]} />,
  value: name,
}));

/**
 *
 * @param {Object} props
 * @param {Function} props.onSelect
 */
const CategoryMenu = ({ onSelect }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Menu borderless className="category-menu">
        <ToggleButton
          className="toggle"
          componentId="Types"
          dataField="types"
          multiSelect={false}
          // showFilter={false}
          data={dataCategories}
          onValueChange={onSelect}
        />
      </Menu>
    </div>
  );
};

export default CategoryMenu;
