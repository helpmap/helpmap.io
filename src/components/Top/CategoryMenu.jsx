import React from 'react';
import { useTheme } from '@material-ui/core';
import { Menu } from 'semantic-ui-react';
import { ToggleButton } from '@appbaseio/reactivesearch';

import './CategoryMenu.scss';

import MenuItem from './MenuItem';
import categories from './messages/menuMessages';

const dataCategories = Object.keys(categories).map((name, index) => ({
  label: <MenuItem key={index} name={name} icon={categories[name].icon} message={categories[name]} />,
  value: name,
}));

const CategoryMenu = ({ onSelect }) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Menu borderless className="category-menu" inverted={isDarkMode}>
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
