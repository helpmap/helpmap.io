import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { ToggleButton } from '@appbaseio/reactivesearch';

import Clothes from '../../assets/clothes.js';
import Food from '../../assets/food.js';

import './CategoryMenu.scss';

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
          data={[
            {
              label: (
                <Menu.Item name="Food">
                  <Food />
                  <span>Food</span>
                </Menu.Item>
              ),
              value: 'food',
            },
            {
              label: (
                <Menu.Item name="Books">
                  <Icon name="book" />
                  <span>Books</span>
                </Menu.Item>
              ),
              value: 'books',
            },
            {
              label: (
                <Menu.Item name="Clothes">
                  <Clothes />
                  <span>Clothes</span>
                </Menu.Item>
              ),
              value: 'clothes',
            },
          ]}
        />
      </Menu>
    </div>
  );
};

export default CategoryMenu;
