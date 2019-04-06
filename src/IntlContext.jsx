import React from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import uk from 'react-intl/locale-data/uk';
import uaTranslation from './lang/ua';
import enTranslation from './lang/en';

addLocaleData([...en, ...uk]);

const { Provider, Consumer } = React.createContext();

class IntlProviderWrapper extends React.Component {
  constructor(...args) {
    super(...args);

    this.switchToEnglish = () => this.setState({ locale: 'en', messages: enTranslation });

    this.switchToUkrainian = () => this.setState({ locale: 'uk', messages: uaTranslation });

    this.state = {
      locale: 'en',
      messages: enTranslation,
      switchToEnglish: this.switchToEnglish,
      switchToUkrainian: this.switchToUkrainian,
    };
  }

  render() {
    const { children } = this.props;
    const { locale, messages } = this.state;
    return (
      <Provider value={this.state}>
        <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale="en">
          {children}
        </IntlProvider>
      </Provider>
    );
  }
}

export { IntlProviderWrapper as IntlProvider, Consumer as IntlConsumer };
