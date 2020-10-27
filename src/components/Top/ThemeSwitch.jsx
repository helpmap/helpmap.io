import React from 'react';
import './ThemeSwitch.scss';

const ThemeSwitch = () => (
  <label className="theme-switch">
    <input type="checkbox" />
    <span className="slider round" />
  </label>
);

export default ThemeSwitch;
