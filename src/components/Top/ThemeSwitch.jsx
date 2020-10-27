import React from 'react';
import './ThemeSwitch.scss';

class ThemeSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  toggleDarkMode() {
    //Toggle dark mode on and off.
    console.log('Dark mode has been toggled');
  }

  render() {
    return (
      <label className="theme-switch">
        <input type="checkbox" onClick={this.toggleDarkMode} />
        <span className="slider round" />
      </label>
    );
  }
}

export default ThemeSwitch;
