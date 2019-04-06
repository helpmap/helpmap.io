import React, { useState } from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import MenuItem from './MenuItem';
import categories from './messages/menuMessages';

const CategoryMenu = () => {
  const [activeItem, setActive] = useState('');

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
      <Segment.Inline>
        <hr />
        <Menu compact icon="labeled">
          {Object.keys(categories).map((name, index) => (
            <MenuItem
              key={index}
              name={name}
              message={categories[name]}
              activeItem={activeItem}
              setActive={setActive}
            />
          ))}
        </Menu>
      </Segment.Inline>
    </div>
  );
};

export default CategoryMenu;
