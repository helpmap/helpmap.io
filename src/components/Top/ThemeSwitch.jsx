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
    let root = document.documentElement;

    if (this.state.darkMode == true) {
      root.style.setProperty('--color-background', '#333');
      root.style.setProperty('--color-foreground', '#fff');
      root.style.setProperty('--color-item', '#CCC');
      root.style.setProperty('--color-highlight-item', '#fff');
      root.style.setProperty('--color-btn-fill', '#999');
      root.style.setProperty('--color-link', '#61dafb');

      this.setState({ darkMode: false });
    } else {
      root.style.setProperty('--color-background', '#fff');
      root.style.setProperty('--color-foreground', '#424242');
      root.style.setProperty('--color-item', '#616161');
      root.style.setProperty('--color-highlight-item', '#000');
      root.style.setProperty('--color-btn-fill', '#999');
      root.style.setProperty('--color-link', '#61dafb');

      this.setState({ darkMode: true });
    }

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
