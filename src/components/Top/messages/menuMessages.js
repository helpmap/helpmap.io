import React from 'react';

import Clothes from '../../../assets/clothes.js';
import Food from '../../../assets/food.js';

const width = 20;

export default {
  Volonteer: {
    id: 'Menu.Volonteer',
    defaultMessage: 'Volonteer',
    icon: 'volonteer',
  },
  Kids: {
    id: 'Menu.Kids',
    defaultMessage: 'Kids',
    icon: '',
  },
  Food: {
    id: 'Menu.Food',
    defaultMessage: 'Food',
    icon: <Food width={width} />,
  },
  Textils: {
    id: 'Menu.Textils',
    defaultMessage: 'Textils',
    icon: <Clothes width={width} />,
  },
  Animal: {
    id: 'Menu.Animal',
    defaultMessage: 'Animal',
    icon: 'Animal',
  },
  Electronic: {
    id: 'Menu.Electronic',
    defaultMessage: 'Electronic',
    icon: 'Electronic',
  },
  Books: {
    id: 'Menu.Books',
    defaultMessage: 'Books',
    icon: 'Books',
  },
  Other: {
    id: 'Menu.Other',
    defaultMessage: 'Other',
    icon: 'Other',
  },
};
