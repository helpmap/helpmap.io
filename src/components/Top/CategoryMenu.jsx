import React, { useState } from 'react'
import { Menu, Segment } from 'semantic-ui-react';
import MenuItem from './MenuItem';

const CategoryMenu = () => {
  const [activeItem, setActive] =  useState('');

  const categories = ['Books', 'Closes', 'Toys', 'Food', 'Others'];
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: "10px" }}>
      <Segment.Inline>
        <hr />
        <Menu compact icon='labeled'>
          {categories.map((el, index) => (
            <MenuItem key={index} name={el} activeItem={activeItem} setActive={setActive} />
          ))}
        </Menu>
      </Segment.Inline>
    </div>
  );
};

export default CategoryMenu;
