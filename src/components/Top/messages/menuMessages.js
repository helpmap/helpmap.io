import React from 'react';

import Animal from '../../../assets/animal';
import Books from '../../../assets/books';
import Clothes from '../../../assets/clothes';
import Electronic from '../../../assets/electronic';
import Food from '../../../assets/food';
import Kids from '../../../assets/kids';
import Other from '../../../assets/other';
import Volonteer from '../../../assets/volonteer';

const width = 20;

export default {
  Volonteer: {
    id: 'Menu.Volonteer',
    defaultMessage: 'Volonteer',
    icon: <Volonteer width={width} />,
    color: '#c41c1c',
  },
  Kids: {
    id: 'Menu.Kids',
    defaultMessage: 'Kids',
    icon: <Kids width={width} />,
    color: '#a20cd4',
  },
  Food: {
    id: 'Menu.Food',
    defaultMessage: 'Food',
    icon: <Food width={width} />,
    color: '#0fb706',
  },
  Textils: {
    id: 'Menu.Textils',
    defaultMessage: 'Textils',
    icon: <Clothes width={width} />,
    color: '#353db1',
  },
  Animal: {
    id: 'Menu.Animal',
    defaultMessage: 'Animal',
    icon: <Animal width={width} />,
    color: '#7b5c23',
  },
  Electronic: {
    id: 'Menu.Electronic',
    defaultMessage: 'Electronic',
    icon: <Electronic width={width} />,
    color: '#115b0f',
  },
  Books: {
    id: 'Menu.Books',
    defaultMessage: 'Books',
    icon: <Books width={width} />,
    color: '#e0ac00',
  },
  Other: {
    id: 'Menu.Other',
    defaultMessage: 'Other',
    icon: <Other width={width} />,
    color: '#41b4e1',
  },
};
