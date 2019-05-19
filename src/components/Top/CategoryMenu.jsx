import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

import './CategoryMenu.scss';
import categories from './messages/menuMessages';

let MenuItem = ({ name, isActive, message, icon, intl, onClick }) => {
  return (
    <Menu.Item active={isActive} name={name} onClick={onClick}>
      {icon}
      <span>{intl.formatMessage(message)}</span>
    </Menu.Item>
  );
};
MenuItem = injectIntl(MenuItem);

const CategoryMenu = ({ onSelect }) => {
  const [category, setCategory] = useState('');

  function set(name) {
    if (category !== name) {
      onSelect(name);
      setCategory(name);
      return;
    }
    onSelect('');
    setCategory('');
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Menu borderless className="category-menu">
        {Object.keys(categories).map((name, index) => (
          <MenuItem
            // eslint-disable-next-line react/jsx-no-bind
            onClick={() => set(name)}
            key={index}
            name={name}
            isActive={name === category}
            icon={categories[name].icon}
            message={categories[name]}
          />
        ))}
        {/* <ToggleButton
          className="toggle"
          componentId="Types"
          dataField="types"
          multiSelect={false}
          // showFilter={false}
          data={dataCategories}
          onValueChange={onSelect}
        /> */}
      </Menu>
    </div>
  );
};

CategoryMenu.propTypes = {
  onSelect: PropTypes.func,
};

export default CategoryMenu;
