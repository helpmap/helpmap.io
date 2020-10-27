import React from 'react';
import './ThemeSwitch.scss';

class ThemeSwitch extends React.Component {
  onClickBtn() {
    //Toggle dark mode on and off.
    console.log('The button has been clicked');
  }

  render() {
    return (
      <label className="theme-switch">
        <input type="checkbox" />
        <span className="slider round" />
      </label>
    );
  }
}

export default ThemeSwitch;
