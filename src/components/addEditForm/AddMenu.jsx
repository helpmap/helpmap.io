import React from 'react';

import Edit from './Edit';
import Info from './Info';

import './AddMenu.scss';

const AddMenu = ({ setMode, setShow, data, mode }) => {
  switch (mode) {
    case 'adding':
      return <Edit setMode={setMode} setShow={setShow} />;
    case 'singleResult':
      return <Info data={data} setMode={setMode} />;
    case 'editing':
      return <Edit setMode={setMode} setShow={setShow} data={data} />;

    default:
      setShow(false);
      return '';
  }
};

export default AddMenu;
