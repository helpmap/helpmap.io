import React from 'react';

import Edit from './Edit';
import Info from './Info';

import './SideMenu.scss';

const SideMenu = ({ setMode, setShow, data, mode }) => {
  switch (mode) {
    case 'adding':
      return <Edit id={null} setMode={setMode} setShow={setShow} />;
    case 'singleResult':
      return <Info id={data._id} setMode={setMode} />;
    case 'editing':
      return <Edit setMode={setMode} setShow={setShow} id={data._id} />;

    default:
      setShow(false);
      return '';
  }
};

export default SideMenu;
