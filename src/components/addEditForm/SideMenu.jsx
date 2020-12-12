import React from 'react';

import Edit from './Edit';
import Info from './Info';

import './SideMenu.scss';

const SideMenu = ({ setMode, data, mode, backToResults }) => {
  switch (mode) {
    case 'adding':
      return <Edit id={null} mode={mode} setMode={setMode} />;
    case 'singleResult':
      return <Info id={data._id} setMode={setMode} backToResults={backToResults} />;
    case 'editing':
      return <Edit id={data._id} mode={mode} setMode={setMode} />;

    default:
      return null;
  }
};

export default SideMenu;
