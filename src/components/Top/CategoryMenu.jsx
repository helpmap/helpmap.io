import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { ToggleButton } from '@appbaseio/reactivesearch';

import './CategoryMenu.scss';

import MenuItem from './MenuItem';
import categories from './messages/menuMessages';

const dataCategories = Object.keys(categories).map((name, index) => ({
  label: <MenuItem key={index} name={name} icon={categories[name].icon} message={categories[name]} />,
  value: name,
}));

const CategoryMenu = () => {
  // const [activeItem, setActive] = useState('');

  // const categories = ['Books', 'Closes', 'Toys', 'Food', 'Others'];

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Menu borderless className="category-menu">
        <ToggleButton
          className="toggle"
          componentId="Types"
          dataField="types"
          multiSelect={false}
          showFilter={false}
          data={dataCategories}
        />
      </Menu>
    </div>
  );
};

export default CategoryMenu;
