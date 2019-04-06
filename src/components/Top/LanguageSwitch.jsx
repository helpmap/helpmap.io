import React from 'react';
import { IntlConsumer } from '../../IntlContext';

const LanguageSwitch = () => (
  <IntlConsumer>
    {({ switchToEnglish, switchToUkrainian }) => (
      <React.Fragment>
        <button onClick={switchToEnglish}>English</button>
        <button onClick={switchToUkrainian}>Ukrainian</button>
      </React.Fragment>
    )}
  </IntlConsumer>
);

export default LanguageSwitch;
