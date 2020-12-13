import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import uk from 'react-intl/locale-data/uk';

import enTranslation from './lang/en';
import ukTranslation from './lang/uk';

addLocaleData([...en, ...uk]);

const { Provider, Consumer } = React.createContext();

class IntlProviderWrapper extends React.Component {
  constructor() {
    super();

    const defaultLocale = 'uk';

    this.state = {
      locale: defaultLocale,
      messages: ukTranslation,
      switchToEnglish: this.switchToEnglish,
      switchToUkrainian: this.switchToUkrainian,
    };

    document.documentElement.lang = defaultLocale;
  }

  componentDidMount() {
    const locale =
      (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || 'en-US';
    if (locale.startsWith('en')) {
      this.switchToEnglish();
    }
  }

  switchToEnglish = () => {
    this.setState({ locale: 'en', messages: enTranslation });
    document.documentElement.lang = 'en';
  };
  switchToUkrainian = () => {
    this.setState({ locale: 'uk', messages: ukTranslation });
    document.documentElement.lang = 'uk';
  };

  render() {
    const { locale } = this.state;
    return (
      <Provider value={this.state} switchToUkrainian={this.switchToUkrainian} switchToEnglish={this.switchToEnglish}>
        <IntlProvider key={locale} {...this.state} defaultLocale={locale}>
          {this.props.children}
        </IntlProvider>
      </Provider>
    );
  }
}

export { IntlProviderWrapper as IntlProvider, Consumer as IntlConsumer };
