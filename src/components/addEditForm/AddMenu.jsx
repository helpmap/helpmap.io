import React from 'react';

import Edit from './Edit';
import Info from './Info';

import './AddMenu.scss';

const AddMenu = ({ setMode, setShow, data, mode }) => {
  if (mode === 'adding') {
    return <Edit setMode={setMode} setShow={setShow} />;
  } else if (mode === 'singleResult') {
    return <Info data={data} setMode={setMode} />;
  } else if (mode === 'editing') {
    return <Edit setMode={setMode} setShow={setShow} data={data} />;
  } else {
    setShow(false);
    return '';
  }
};

export default AddMenu;
