import React from 'react';
import './ThemeSwitch.scss';

class ThemeSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.toggleDarkMode = this.toggleDarkMode.bind(this);
    this.state = {
      darkMode: false,
    };
  }

  toggleDarkMode() {
    //Toggle dark mode on and off
    this.state.darkMode == true ? this.setState({ darkMode: false }) : this.setState({ darkMode: true });

    console.log(this.state.darkMode);
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
