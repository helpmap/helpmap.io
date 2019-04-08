import React from 'react';
import { IntlConsumer } from '../../IntlContext';

const LanguageSwitch = () => (
  <IntlConsumer>
    {({ switchToEnglish, switchToUkrainian, locale }) => (
      <React.Fragment>
        <span className={locale === 'en' ? 'active' : 'en'} onClick={switchToEnglish}>
          Eng
        </span>
        &nbsp;/&nbsp;
        <span className={locale === 'uk' ? 'active' : 'uk'} onClick={switchToUkrainian}>
          Укр
        </span>
      </React.Fragment>
    )}
  </IntlConsumer>
);

export default LanguageSwitch;
