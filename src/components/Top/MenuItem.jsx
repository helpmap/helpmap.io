import React from 'react'
import { Menu, Icon } from 'semantic-ui-react'

const MenuItem = ({ name, setActive, activeItem }) => {
  return (
    <Menu.Item 
      name={name}
      active={activeItem === name} 
      onClick={(e, { name }) => setActive(name)}
    >
      <Icon name={activeItem === name ? 'circle' : 'circle outline'} />
        {name}
    </Menu.Item>
  );
};

export default MenuItem;
